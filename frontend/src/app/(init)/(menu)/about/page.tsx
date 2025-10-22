"use client"

import { motion } from "framer-motion";
import { Sparkles, Bot, Mail, BookOpenText } from "lucide-react";

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-br from-[#1f1f4d]/90 via-[#383882]/90 to-[#2e2e61]/90 backdrop-blur-sm text-white py-12 px-4 sm:px-8 md:px-12 lg:px-20 rounded-3xl shadow-2xl max-w-6xl mx-auto space-y-8 border border-white/10"
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex flex-col items-center justify-center gap-3"
            >
                <motion.div
                    animate={{ rotate: 10, scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
                >
                    <Sparkles className="w-9 h-9 text-yellow-300/90" />
                </motion.div>
                <h2 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Sobre o AtendeBot
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, staggerChildren: 0.1 }}
                className="space-y-6 text-base sm:text-lg leading-relaxed"
            >
                <motion.p 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300"
                >
                    <Bot className="text-pink-400 w-6 h-6 mt-1 flex-shrink-0" />
                    <span>O <strong className="text-pink-300">AtendeBot</strong> é uma plataforma de atendimento automatizado com inteligência artificial, criada para facilitar a comunicação entre empresas e seus clientes.</span>
                </motion.p>

                <motion.p 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300"
                >
                    <Mail className="text-blue-400 w-6 h-6 mt-1 flex-shrink-0" />
                    <span>Seu principal objetivo é <strong className="text-blue-300">agilizar o suporte</strong> e responder dúvidas frequentes automaticamente, melhorando a experiência do usuário.</span>
                </motion.p>

                <motion.p 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300"
                >
                    <BookOpenText className="text-green-400 w-6 h-6 mt-1 flex-shrink-0" />
                    <span>As empresas se cadastram, registram suas perguntas frequentes (FAQs), e o bot utiliza IA para responder com base nesse conteúdo.</span>
                </motion.p>

                <motion.p 
                    whileHover={{ scale: 1.01 }}
                    className="p-3 rounded-lg bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-white/5"
                >
                    Este projeto foi desenvolvido como parte do <strong className="text-purple-300">Trabalho de Conclusão de Curso</strong> (TCC) em Engenharia de Software pela <strong className="text-blue-300">UNIGRAN</strong>, por <strong className="text-pink-300">Josdegar Ferreira dos Santos</strong>.
                </motion.p>

                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-sm text-gray-300/80 text-center italic mt-8"
                >
                    Tecnologias utilizadas: Next.js, Tailwind CSS, ShadCN UI, Axios, Node.js, Prisma, PostgreSQL, OpenAI API
                </motion.p>
            </motion.div>
        </motion.div>
    );
}

export default About;