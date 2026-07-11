import React, { useState, useEffect } from 'react';
import { RiUserAddLine, RiSearchLine, RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
import { UserModal } from '../components/common/UserModal';
import { userService } from '../services/userService';

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ show: boolean; message: string; type: string }>({ show: false, message: '', type: 'success' });

  const roleNames: Record<string, string> = {
    super_admin: 'سوپر ادمین',
    company_admin: 'مدیر شرکت',
    accountant: 'حسابدار',
    warehouse_keeper: 'انباردار',
    viewer: 'مشاهده گر',
  };

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    setLoading(true); setError('');
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (e: any) {
      setError('خطا در دریافت کاربران از سرور');
    } finally { setLoading(false); }
  };

  const showToast = (message: string, type: string = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleSave = async (data: any) => {
    try {
      if (editUser) {
        await userService.updateUser(editUser.id, data);
        showToast('کاربر با موفقیت ویرایش شد');
      } else {
        await userService.createUser(data);
        showToast('کاربر با موفقیت ایجاد شد');
      }
      setShowModal(false);
      setEditUser(null);
      loadUsers();
    } catch (e: any) {
      showToast(e.response?.data?.message || 'خطا در عملیات', 'danger');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('آیا از حذف این کاربر اطمینان دارید؟')) return;
    try {
      await userService.deleteUser(id);
      showToast('کاربر غیرفعال شد', 'danger');
      loadUsers();
    } catch (e: any) {
      showToast('خطا در حذف کاربر', 'danger');
    }
  };

  const openAdd = () => { setEditUser(null); setShowModal(true); };
  const openEdit = (user: any) => { setEditUser(user); setShowModal(true); };

  const filteredUsers = users.filter((u: any) =>
    (u.fullName || '').includes(search) || (u.mobile || '').includes(search)
  );

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" />
        <p className="mt-2 text-muted">در حال بارگذاری کاربران...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Toast Notification */}
      {toast.show && (
        <div className="position-fixed bottom-0 end-0 m-4" style={{ zIndex: 9999 }}>
          <div className={`alert alert-${toast.type} py-2 px-4 shadow-lg`} style={{ borderRadius: '10px', border: 'none' }}>
            {toast.type === 'success' ? '✅' : '❌'} {toast.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 style={{ fontWeight: 500 }}>👥 کاربران</h4>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>{users.length} کاربر در سیستم</p>
        </div>
        <button
          className="btn text-white d-flex align-items-center gap-2"
          onClick={openAdd}
          style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px', padding: '10px 20px' }}
        >
          <RiUserAddLine /> افزودن کاربر
        </button>
      </div>

      {/* Search */}
      <div className="card p-3 mb-3" style={{ borderRadius: '12px' }}>
        <div className="position-relative">
          <RiSearchLine className="position-absolute" style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input
            type="text"
            className="form-control"
            placeholder="جستجو بر اساس نام یا موبایل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingRight: '40px', borderRadius: '8px', border: '1px solid #e0e0e0' }}
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-warning text-center" style={{ borderRadius: '12px' }}>
          {error}
          <button className="btn btn-sm btn-outline-warning ms-3" onClick={loadUsers}>تلاش مجدد</button>
        </div>
      )}

      {/* Empty State */}
      {!error && filteredUsers.length === 0 && (
        <div className="card p-5 text-center" style={{ borderRadius: '12px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
          <h5 style={{ fontWeight: 500 }}>کاربری یافت نشد</h5>
          <p className="text-muted">هیچ کاربری با این مشخصات وجود ندارد.</p>
          <button className="btn text-white mt-2" onClick={openAdd} style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px' }}>
            <RiUserAddLine className="ms-1" /> افزودن اولین کاربر
          </button>
        </div>
      )}

      {/* Users Table */}
      {!error && filteredUsers.length > 0 && (
        <div className="card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{ backgroundColor: '#fafafa' }}>
                <tr>
                  <th className="py-3 px-4" style={{ fontWeight: 500, color: '#666', fontSize: '0.85rem' }}>نام</th>
                  <th className="py-3 px-4" style={{ fontWeight: 500, color: '#666', fontSize: '0.85rem' }}>موبایل</th>
                  <th className="py-3 px-4" style={{ fontWeight: 500, color: '#666', fontSize: '0.85rem' }}>نقش</th>
                  <th className="py-3 px-4" style={{ fontWeight: 500, color: '#666', fontSize: '0.85rem' }}>وضعیت</th>
                  <th className="py-3 px-4" style={{ fontWeight: 500, color: '#666', fontSize: '0.85rem' }}>آخرین ورود</th>
                  <th className="py-3 px-4" style={{ fontWeight: 500, color: '#666', fontSize: '0.85rem' }}>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u: any) => (
                  <tr key={u.id}>
                    <td className="py-3 px-4">
                      <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle d-flex align-items-center justify-content-center text-white" style={{ width: 36, height: 36, backgroundColor: '#1A237E', fontSize: '0.85rem' }}>
                          {(u.fullName || '?')[0]}
                        </div>
                        <span style={{ fontWeight: 500 }}>{u.fullName || '---'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4" style={{ direction: 'ltr', textAlign: 'left' }}>{u.mobile}</td>
                    <td className="py-3 px-4">
                      <span className="badge rounded-pill" style={{ backgroundColor: 'rgba(26,35,126,0.1)', color: '#1A237E', fontWeight: 400 }}>
                        {roleNames[u.role] || u.role || '---'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="badge rounded-pill" style={{
                        backgroundColor: u.status === 'active' ? 'rgba(0,200,83,0.1)' : 'rgba(255,23,68,0.1)',
                        color: u.status === 'active' ? '#00C853' : '#FF1744',
                        fontWeight: 400
                      }}>
                        {u.status === 'active' ? 'فعال' : 'غیرفعال'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted" style={{ fontSize: '0.85rem' }}>{u.lastLogin || '---'}</td>
                    <td className="py-3 px-4">
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-light" style={{ borderRadius: '6px' }} onClick={() => openEdit(u)} title="ویرایش">
                          <RiEdit2Line />
                        </button>
                        <button className="btn btn-sm btn-light" style={{ borderRadius: '6px', color: '#FF1744' }} onClick={() => handleDelete(u.id)} title="حذف">
                          <RiDeleteBinLine />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User Modal */}
      <UserModal
        show={showModal}
        onClose={() => { setShowModal(false); setEditUser(null); }}
        onSave={handleSave}
        editUser={editUser}
      />
    </div>
  );
};
