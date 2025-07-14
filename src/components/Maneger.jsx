import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

function PasswordManager() {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const [showPasswords, setShowPasswords] = useState(false);

    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast.success('Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
        });
        navigator.clipboard.writeText(text)
    }

    const togglePasswordVisibility = () => {
        if (passwordRef.current.type === "password") {
            passwordRef.current.type = "text";
            ref.current.src = "public/eyecross.png";
        } else {
            passwordRef.current.type = "password";
            ref.current.src = "public/eye.png";
        }
    }

    const savePassword = () => {
        if (!form.site || !form.username || !form.password) {
            toast.error('Please fill all fields!');
            return;
        }

        const newPassword = { ...form, id: uuidv4() };
        const updatedPasswords = [...passwordArray, newPassword];
        setPasswordArray(updatedPasswords);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
        setForm({ site: "", username: "", password: "" });
        toast.success('Password saved successfully!');
    }

    const deletePassword = (id) => {
        if (window.confirm("Are you sure you want to delete this password?")) {
            const updatedPasswords = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedPasswords);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            toast.info('Password deleted!');
        }
    }

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(item => item.id === id);
        setForm(passwordToEdit);
        setPasswordArray(passwordArray.filter(item => item.id !== id));
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden -z-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-xl animate-float1"></div>
                <div className="absolute top-1/4 right-0 w-48 h-48 bg-blue-200 rounded-full opacity-20 blur-xl animate-float2"></div>
                <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-teal-200 rounded-full opacity-20 blur-xl animate-float3"></div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-6xl relative">
                <ToastContainer />

                {/* Header */}
                <header className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-lg mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className='text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600'>
                        SecureVault
                    </h1>
                    <p className='text-gray-600 text-lg'>Your personal password manager</p>
                </header>

                {/* Form Section */}
                <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-10 border border-white/20">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Add New Password</h2>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                                <input
                                    value={form.site}
                                    onChange={handleChange}
                                    placeholder='https://example.com'
                                    className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all'
                                    type="text"
                                    name="site"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username/Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        value={form.username}
                                        onChange={handleChange}
                                        placeholder='username@example.com'
                                        className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all'
                                        type="text"
                                        name="username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        ref={passwordRef}
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder='••••••••'
                                        className='w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all'
                                        type="password"
                                        name="password"
                                    />
                                    <button
                                        onClick={togglePasswordVisibility}
                                        className='absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-green-600 transition-colors'
                                        aria-label="Toggle password visibility"
                                    >
                                        <img ref={ref} width={20} src="public/eye.png" alt="eye" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={savePassword}
                                className='flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium rounded-lg px-8 py-3 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                                Save Password
                            </button>
                        </div>
                    </div>
                </section>

                {/* Passwords List Section */}
                <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className='text-xl font-semibold text-gray-800'>Your Passwords</h2>
                        <button 
                            onClick={() => setShowPasswords(!showPasswords)}
                            className="text-sm text-green-600 hover:text-green-800 flex items-center gap-1"
                        >
                            {showPasswords ? 'Hide' : 'Show'} Passwords
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {showPasswords ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {passwordArray.length === 0 ? (
                        <div className="text-center py-12">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-700">No passwords saved yet</h3>
                            <p className="mt-1 text-gray-500">Add your first password above to get started</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full rounded-xl overflow-hidden">
                                <thead className='bg-gradient-to-r from-green-600 to-blue-600 text-white'>
                                    <tr>
                                        <th className='py-4 px-6 text-left'>Website</th>
                                        <th className='py-4 px-6 text-left'>Username</th>
                                        <th className='py-4 px-6 text-left'>Password</th>
                                        <th className='py-4 px-6 text-right'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>
                                    {passwordArray.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                                            <td className='py-4 px-6'>
                                                <div className='flex items-center gap-3'>
                                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <a
                                                            href={item.site.startsWith('http') ? item.site : `https://${item.site}`}
                                                            target='_blank'
                                                            rel="noopener noreferrer"
                                                            className="text-green-600 hover:underline font-medium"
                                                        >
                                                            {item.site.replace(/^https?:\/\//, '').split('/')[0]}
                                                        </a>
                                                    </div>
                                                    <button
                                                        onClick={() => copyText(item.site)}
                                                        className="ml-auto text-gray-400 hover:text-green-600 p-1 transition-colors"
                                                        aria-label="Copy site URL"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className='py-4 px-6'>
                                                <div className='flex items-center gap-2'>
                                                    <span className="text-gray-700">{item.username}</span>
                                                    <button
                                                        onClick={() => copyText(item.username)}
                                                        className="text-gray-400 hover:text-green-600 p-1 transition-colors"
                                                        aria-label="Copy username"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className='py-4 px-6'>
                                                <div className='flex items-center gap-2'>
                                                    <span className="font-mono">
                                                        {showPasswords ? item.password : '••••••••'}
                                                    </span>
                                                    <button
                                                        onClick={() => copyText(item.password)}
                                                        className="text-gray-400 hover:text-green-600 p-1 transition-colors"
                                                        aria-label="Copy password"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className='py-4 px-6 text-right'>
                                                <div className="flex justify-end gap-3">
                                                    <button
                                                        onClick={() => editPassword(item.id)}
                                                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                                        aria-label="Edit password"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => deletePassword(item.id)}
                                                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                                        aria-label="Delete password"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>

            {/* Animation keyframes */}
            <style jsx>{`
                @keyframes float1 {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-20px) translateX(10px); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(15px) translateX(-15px); }
                }
                @keyframes float3 {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(20px) translateX(5px); }
                }
                .animate-float1 { animation: float1 8s ease-in-out infinite; }
                .animate-float2 { animation: float2 10s ease-in-out infinite; }
                .animate-float3 { animation: float3 12s ease-in-out infinite; }
            `}</style>
        </div>
    )
}

export default PasswordManager