
import React, { useEffect, useState } from 'react';
import { userService } from '../../services/firestore';
import { User } from '../../types';
import { Timestamp } from 'firebase/firestore';

const Students: React.FC = () => {
    const [students, setStudents] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const users = await userService.getAllUsers();
            // Filter only students
            setStudents(users.filter(u => u.role === 'student'));
        } catch (error) {
            console.error("Error fetching students:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleToggleStatus = async (student: User) => {
        try {
            const newStatus = student.status === 'ativo' ? 'vencido' : 'ativo';
            // If activating, set due date to 30 days from now (simple logic for manual activation)
            let newDueDate = student.data_vencimento;

            if (newStatus === 'ativo') {
                const date = new Date();
                date.setDate(date.getDate() + 30);
                newDueDate = Timestamp.fromDate(date);
            }

            await userService.updateUserStatus(student.id, newStatus, newDueDate);
            await fetchStudents(); // Refresh list
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Erro ao atualizar status");
        }
    };

    if (loading) {
        return <div className="text-center p-10">Carregando alunos...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gerenciar Alunos</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimento</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.map((student) => {
                            let dueDateString = 'N/A';
                            if (student.data_vencimento && typeof student.data_vencimento.toDate === 'function') {
                                dueDateString = student.data_vencimento.toDate().toLocaleDateString();
                            } else if (student.data_vencimento) {
                                dueDateString = new Date(student.data_vencimento).toLocaleDateString();
                            }

                            return (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{student.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{student.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${student.status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {student.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {dueDateString}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleToggleStatus(student)}
                                            className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded transition-colors
                                                ${student.status === 'ativo' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                                        >
                                            {student.status === 'ativo' ? 'Bloquear' : 'Ativar'}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Students;
