
import React, { useState } from 'react';
import { Search, MoreVertical, Edit, Trash2, UserCheck, UserX } from 'lucide-react';
import clsx from 'clsx';

const StudentsList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data
    const students = [
        { id: 1, name: 'João Silva', email: 'joao@email.com', plan: 'Intermediário', status: 'Ativo', start: '10/02/2026' },
        { id: 2, name: 'Maria Souza', email: 'maria@email.com', plan: 'Básico', status: 'Pendente', start: '12/02/2026' },
        { id: 3, name: 'Pedro Santos', email: 'pedro@email.com', plan: 'Premium', status: 'Inativo', start: '01/01/2026' },
        { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', plan: 'Intermediário', status: 'Ativo', start: '15/02/2026' },
        { id: 5, name: 'Lucas pereira', email: 'lucas@email.com', plan: 'Premium', status: 'Ativo', start: '05/02/2026' },
    ];

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-white">Gerenciar Alunos</h1>
                    <p className="text-gray-400">Visualize e gerencie todos os alunos cadastrados.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou e-mail..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-900 border border-gray-800 text-white pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-primary w-full md:w-80 transition-colors"
                    />
                </div>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-800/50 text-gray-400 text-sm uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium">Aluno</th>
                                <th className="px-6 py-4 font-medium">Plano</th>
                                <th className="px-6 py-4 font-medium">Data Início</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-bold text-white">{student.name}</div>
                                            <div className="text-sm text-gray-500">{student.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300">{student.plan}</td>
                                    <td className="px-6 py-4 text-gray-400">{student.start}</td>
                                    <td className="px-6 py-4">
                                        <span className={clsx(
                                            "px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
                                            student.status === 'Ativo' ? "bg-green-500/20 text-green-500" :
                                                student.status === 'Pendente' ? "bg-yellow-500/20 text-yellow-500" :
                                                    "bg-red-500/20 text-red-500"
                                        )}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors" title="Editar">
                                                <Edit size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-500/10 rounded-lg transition-colors" title="Ativar/Desativar">
                                                {student.status === 'Ativo' ? <UserX size={18} /> : <UserCheck size={18} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredStudents.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        Nenhum aluno encontrado.
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentsList;
