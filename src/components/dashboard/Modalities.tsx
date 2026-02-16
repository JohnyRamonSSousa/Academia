
import React, { useState } from 'react';
import { Plus, Trash2, Dumbbell } from 'lucide-react';

const ModalitiesView: React.FC = () => {
    const [myModalities, setMyModalities] = useState([
        { id: 1, name: 'Musculação', active: true },
        { id: 2, name: 'CrossFit', active: true },
    ]);

    const availableModalities = [
        { id: 3, name: 'Muay Thai', price: 39.90 },
        { id: 4, name: 'Boxe', price: 39.90 },
        { id: 5, name: 'Jiu-jitsu', price: 39.90 },
        { id: 6, name: 'Zumba', price: 29.90 },
        { id: 7, name: 'FitDance', price: 29.90 },
    ];

    const handleAdd = (modality: any) => {
        // TODO: Implement add logic
        alert(`Adicionar ${modality.name} ao plano? O valor aumentará R$ ${modality.price.toFixed(2)} mensais.`);
    };

    const handleRemove = (id: number) => {
        // TODO: Implement remove logic
        setMyModalities(myModalities.filter(m => m.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold font-heading mb-8 text-white">Minhas Modalidades</h1>

            {/* Active Modalities */}
            <section className="mb-12">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <div className="w-2 h-6 bg-primary rounded-full" />
                    Ativas no Plano
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {myModalities.map((item) => (
                        <div key={item.id} className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center justify-between group hover:border-gray-700 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/20 p-3 rounded-lg text-primary">
                                    <Dumbbell size={24} />
                                </div>
                                <span className="font-bold text-lg text-white">{item.name}</span>
                            </div>
                            <button
                                onClick={() => handleRemove(item.id)}
                                className="text-gray-500 hover:text-red-500 transition-colors p-2"
                                title="Remover modalidade"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Available Modalities */}
            <section>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <div className="w-2 h-6 bg-gray-700 rounded-full" />
                    Adicionar Extras
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {availableModalities.map((item) => (
                        <div key={item.id} className="bg-gray-900 border border-gray-800 p-6 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-colors h-full flex flex-col">
                            <h3 className="font-bold text-white text-lg mb-1">{item.name}</h3>
                            <p className="text-gray-400 text-sm mb-6">+ R$ {item.price.toFixed(2).replace('.', ',')} / mês</p>

                            <button
                                onClick={() => handleAdd(item)}
                                className="mt-auto w-full border border-gray-700 hover:border-primary hover:bg-primary/10 hover:text-primary text-white py-2 rounded-lg transition-all flex items-center justify-center gap-2 font-medium"
                            >
                                <Plus size={18} />
                                Adicionar
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ModalitiesView;
