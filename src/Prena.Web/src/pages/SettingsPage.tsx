import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { RiPaintLine, RiFontSize, RiSunLine, RiMoonLine, RiCheckLine } from 'react-icons/ri';

export const SettingsPage: React.FC = () => {
  const { theme, updateTheme, resetTheme, availableFonts, colorPalettes } = useTheme();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 style={{ fontWeight: 500 }}>تنظیمات</h4>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            شخصی سازی پوسته و نمایش
          </p>
        </div>
        <button
          className="btn btn-outline-secondary"
          onClick={resetTheme}
          style={{ borderRadius: '8px' }}
        >
          بازنشانی به پیش فرض
        </button>
      </div>

      <div className="row g-4">
        
        {/* ========== Color Palette ========== */}
        <div className="col-12">
          <div className="card" style={{ borderRadius: '12px' }}>
            <div className="card-header bg-transparent border-bottom">
              <h5 className="mb-0 d-flex align-items-center gap-2">
                <RiPaintLine /> پالت رنگی
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {colorPalettes.map((palette, i) => (
                  <div className="col-6 col-md-4 col-lg-2" key={i}>
                    <div
                      className={`card border-2 p-3 text-center h-100 ${theme.primaryColor === palette.primary ? 'border-primary' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        updateTheme('primaryColor', palette.primary);
                        updateTheme('accentColor', palette.accent);
                      }}
                    >
                      <div className="d-flex gap-2 mb-2 justify-content-center">
                        <div style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: palette.primary }} />
                        <div style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: palette.accent }} />
                      </div>
                      <small style={{ fontWeight: 500 }}>{palette.name}</small>
                      {theme.primaryColor === palette.primary && (
                        <RiCheckLine className="text-primary position-absolute" style={{ top: 8, left: 8 }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========== Dark/Light Mode ========== */}
        <div className="col-12 col-md-6">
          <div className="card h-100" style={{ borderRadius: '12px' }}>
            <div className="card-header bg-transparent border-bottom">
              <h5 className="mb-0 d-flex align-items-center gap-2">
                {theme.mode === 'dark' ? <RiMoonLine /> : <RiSunLine />}
                حالت نمایش
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex gap-3">
                <button
                  className={`btn flex-grow-1 py-3 ${theme.mode === 'light' ? 'btn-prena text-white' : 'btn-light'}`}
                  onClick={() => updateTheme('mode', 'light')}
                >
                  <RiSunLine size={24} className="mb-2 d-block mx-auto" />
                  روشن
                </button>
                <button
                  className={`btn flex-grow-1 py-3 ${theme.mode === 'dark' ? 'btn-prena text-white' : 'btn-light'}`}
                  onClick={() => updateTheme('mode', 'dark')}
                >
                  <RiMoonLine size={24} className="mb-2 d-block mx-auto" />
                  تاریک
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========== Font Family ========== */}
        <div className="col-12 col-md-6">
          <div className="card h-100" style={{ borderRadius: '12px' }}>
            <div className="card-header bg-transparent border-bottom">
              <h5 className="mb-0 d-flex align-items-center gap-2">
                <RiFontSize /> فونت
              </h5>
            </div>
            <div className="card-body">
              <select
                className="form-select form-select-lg"
                value={theme.fontFamily}
                onChange={(e) => updateTheme('fontFamily', e.target.value)}
                style={{ borderRadius: '8px' }}
              >
                {availableFonts.map(font => (
                  <option key={font.key} value={font.cssName}>
                    {font.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ========== Font Size ========== */}
        <div className="col-12 col-md-4">
          <div className="card h-100" style={{ borderRadius: '12px' }}>
            <div className="card-header bg-transparent border-bottom">
              <h5 className="mb-0">اندازه فونت</h5>
            </div>
            <div className="card-body">
              <div className="d-flex gap-2">
                {(['small', 'medium', 'large'] as const).map(size => (
                  <button
                    key={size}
                    className={`btn flex-grow-1 ${theme.fontSize === size ? 'btn-prena text-white' : 'btn-light'}`}
                    onClick={() => updateTheme('fontSize', size)}
                  >
                    {{ small: 'کوچک', medium: 'متوسط', large: 'بزرگ' }[size]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========== Border Radius ========== */}
        <div className="col-12 col-md-4">
          <div className="card h-100" style={{ borderRadius: '12px' }}>
            <div className="card-header bg-transparent border-bottom">
              <h5 className="mb-0">گوشه ها</h5>
            </div>
            <div className="card-body">
              <div className="d-flex gap-2">
                {(['sharp', 'standard', 'round'] as const).map(radius => (
                  <button
                    key={radius}
                    className={`btn flex-grow-1 ${theme.borderRadius === radius ? 'btn-prena text-white' : 'btn-light'}`}
                    onClick={() => updateTheme('borderRadius', radius)}
                  >
                    {{ sharp: 'تیز', standard: 'معمولی', round: 'گرد' }[radius]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========== Density ========== */}
        <div className="col-12 col-md-4">
          <div className="card h-100" style={{ borderRadius: '12px' }}>
            <div className="card-header bg-transparent border-bottom">
              <h5 className="mb-0">تراکم</h5>
            </div>
            <div className="card-body">
              <div className="d-flex gap-2">
                {(['compact', 'standard', 'comfortable'] as const).map(density => (
                  <button
                    key={density}
                    className={`btn flex-grow-1 ${theme.density === density ? 'btn-prena text-white' : 'btn-light'}`}
                    onClick={() => updateTheme('density', density)}
                  >
                    {{ compact: 'فشرده', standard: 'معمولی', comfortable: 'باز' }[density]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};