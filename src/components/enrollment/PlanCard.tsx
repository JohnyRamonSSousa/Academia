
import React from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface PlanCardProps {
    name: string;
    price: string;
    features: string[];
    selected: boolean;
    onSelect: () => void;
    recommended?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ name, price, features, selected, onSelect, recommended }) => {
    return (
        <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={onSelect}
            className={clsx(
                'relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200',
                selected
                    ? 'border-primary bg-primary/10 shadow-lg shadow-primary/10'
                    : 'border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-900'
            )}
        >
            {recommended && (
                <span className="absolute -top-3 right-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                    Recomendado
                </span>
            )}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className={clsx("font-bold text-lg", selected ? "text-primary" : "text-white")}>{name}</h3>
                    <p className="text-sm text-gray-400">Mensal</p>
                </div>
                <div className="flex items-center">
                    <div className={clsx(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                        selected ? "border-primary bg-primary" : "border-gray-600"
                    )}>
                        {selected && <Check size={14} className="text-white" />}
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <span className="text-2xl font-bold text-white">R$ {price}</span>
            </div>

            <ul className="space-y-2">
                {features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                        <Check size={12} className="text-primary shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
                {features.length > 3 && (
                    <li className="text-xs text-gray-500 italic">+ {features.length - 3} benefícios</li>
                )}
            </ul>
        </motion.div>
    );
};

export default PlanCard;
