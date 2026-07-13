import React, { useState, useEffect } from 'react';
import { RiAddLine, RiEdit2Line, RiDeleteBinLine, RiSearchLine } from 'react-icons/ri';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../components/common/ToastContainer';
import { productService } from '../../services/productService';

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    setLoading(true);
    try { const data = await productService.getProducts(); setProducts(data); }
    catch { showToast('خطا در بارگذاری', 'error'); }
    finally { setLoading(false); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as any;
    const data = { name: form.name.value, code: form.code.value, unit: form.unit.value, price: parseFloat(form.price.value) };
    try {
      if (editItem) {
        await productService.updateProduct(editItem.id, data);
        showToast('محصول ویرایش شد');
      } else {
        await productService.createProduct(data);
        showToast('محصول ایجاد شد');
      }
      setShowModal(false); setEditItem(null); loadProducts();
    } catch { showToast('خطا در عملیات', 'error'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('حذف شود؟')) return;
    try { await productService.deleteProduct(id); showToast('محصول حذف شد', 'warning'); loadProducts(); }
    catch { showToast('خطا', 'error'); }
  };

  const openEdit = (p: any) => { setEditItem(p); setShowModal(true); };
  const openAdd = () => { setEditItem(null); setShowModal(true); };

  const filtered = products.filter((p: any) => p.name?.includes(search) || p.code?.includes(search));

  if (loading) return <div className="text-center p-5"><div className="spinner-border text-primary" /></div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div><h4 style={{ fontWeight: 500 }}>📦 مدیریت محصولات</h4><p className="text-muted" style={{ fontSize: '0.9rem' }}>{products.length} محصول</p></div>
        <button className="btn text-white d-flex align-items-center gap-2" onClick={openAdd} style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px', padding: '10px 20px' }}>
          <RiAddLine /> محصول جدید
        </button>
      </div>

      <div className="card p-3 mb-3" style={{ borderRadius: '12px' }}>
        <div className="position-relative">
          <RiSearchLine className="position-absolute" style={{ right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input type="text" className="form-control" placeholder="جستجو..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingRight: '40px', borderRadius: '8px' }} />
        </div>
      </div>

      <div className="card" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{ backgroundColor: '#fafafa' }}>
              <tr><th className="py-3 px-4">کد</th><th className="py-3 px-4">نام</th><th className="py-3 px-4">واحد</th><th className="py-3 px-4">موجودی</th><th className="py-3 px-4">قیمت</th><th className="py-3 px-4">عملیات</th></tr>
            </thead>
            <tbody>
              {filtered.map((p: any) => (
                <tr key={p.id}>
                  <td className="py-3 px-4"><span style={{ fontWeight: 500 }}>{p.code}</span></td>
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4">{p.unit}</td>
                  <td className="py-3 px-4"><span style={{ color: p.quantity < 20 ? '#FF1744' : '#00C853', fontWeight: 500 }}>{p.quantity}</span></td>
                  <td className="py-3 px-4">{p.price?.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-light" onClick={() => openEdit(p)}><RiEdit2Line /></button>
                      <button className="btn btn-sm btn-light text-danger" onClick={() => handleDelete(p.id)}><RiDeleteBinLine /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} title={editItem ? 'ویرایش محصول' : 'محصول جدید'}>
        <form onSubmit={handleSave}>
          <div className="mb-3"><label className="form-label">نام</label><input name="name" className="form-control" defaultValue={editItem?.name} required style={{ borderRadius: '8px' }} /></div>
          <div className="mb-3"><label className="form-label">کد</label><input name="code" className="form-control" defaultValue={editItem?.code} required style={{ borderRadius: '8px' }} /></div>
          <div className="row g-3 mb-3">
            <div className="col-6"><label className="form-label">واحد</label><input name="unit" className="form-control" defaultValue={editItem?.unit} style={{ borderRadius: '8px' }} /></div>
            <div className="col-6"><label className="form-label">قیمت</label><input name="price" type="number" className="form-control" defaultValue={editItem?.price} style={{ borderRadius: '8px' }} /></div>
          </div>
          <button type="submit" className="btn text-white w-100" style={{ background: 'linear-gradient(135deg, #1A237E, #283593)', borderRadius: '8px' }}>{editItem ? 'ذخیره' : 'ایجاد'}</button>
        </form>
      </Modal>
    </div>
  );
};