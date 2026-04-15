import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export function SignUpPage() {
  const { signIn } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('Please fill in all fields.'); return;
    }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (!agreed) { setError('Please agree to the terms.'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    signIn(form.email, `${form.firstName} ${form.lastName}`);
    setLoading(false);
    navigate('/account');
  };

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColors = ['', 'bg-red-500', 'bg-yellow-400', 'bg-green-500'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-md mx-auto px-4 text-center">
          <Link to="/" className="text-2xl font-bold tracking-tight inline-block mb-2">SHILOH</Link>
          <p className="text-sm text-gray-600">Create your trading account</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create your account</h2>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">FIRST NAME</label>
                  <input
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    onChange={update('firstName')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">LAST NAME</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={update('lastName')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">EMAIL</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={update('email')}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">PASSWORD</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Min 8 characters"
                    value={form.password}
                    onChange={update('password')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${strengthColors[strength]}`} style={{ width: `${strength * 33}%` }} />
                    </div>
                    <span className="text-xs text-gray-600">{strengthLabels[strength]}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">CONFIRM PASSWORD</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    value={form.confirm}
                    onChange={update('confirm')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm"
                  />
                  {form.confirm && form.confirm === form.password && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="#" className="text-blue-600 hover:underline">Terms of Service</Link> and{' '}
                  <Link to="#" className="text-blue-600 hover:underline">Privacy Policy</Link>
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-lg transition-colors mt-2"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{' '}
              <Link to="/signin" className="text-blue-600 hover:text-blue-700 font-semibold">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500">
          © 2024 SHILOH. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
