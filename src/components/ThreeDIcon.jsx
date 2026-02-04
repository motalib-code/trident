
import React from 'react';
import { motion } from 'framer-motion';

const ThreeDIcon = ({ Icon, color = "text-primary-500", size = "w-8 h-8", depth = 2 }) => {
    // Create layers for 3D effect
    const layers = Array.from({ length: depth }, (_, i) => i);

    return (
        <div className={`relative ${size} perspective-1000 group`}>
            <motion.div
                className="w-full h-full relative preserve-3d transition-transform duration-300 group-hover:rotate-y-12 group-hover:rotate-x-12"
                initial={{ rotateX: 0, rotateY: 0 }}
                whileHover={{ rotateX: 10, rotateY: 10, scale: 1.1 }}
            >
                {/* Shadow/Depth Layers */}
                {layers.map((i) => (
                    <Icon
                        key={i}
                        className={`absolute top-0 left-0 w-full h-full text-black/20 transform translate-x-[${(i + 1) * 1}px] translate-y-[${(i + 1) * 1}px]`}
                        style={{
                            transform: `translate(${i + 1}px, ${i + 1}px)`,
                            zIndex: -i
                        }}
                    />
                ))}

                {/* Main Icon */}
                <Icon className={`relative w-full h-full ${color} drop-shadow-xl filter`} />

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay" />
            </motion.div>
        </div>
    );
};

export default ThreeDIcon;
