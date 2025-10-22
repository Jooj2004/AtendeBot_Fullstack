"use client";

import { Button } from "@/components/layout/button";
import { motion } from "framer-motion";
import { Bot, Zap, ShieldCheck, BarChart, Smartphone, Settings, UserCheck, MessageCircle, Brain, Database, Cloud, Bell, BookOpen, LayoutDashboard, Globe, Users, Clock, Code, FileText } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Bot className="w-7 h-7" />,
      title: "Atendimento Automatizado",
      description: "Respostas instantâneas 24/7 para as dúvidas mais comuns dos clientes, reduzindo o tempo de espera."
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Integração Rápida",
      description: "Fácil integração com o site da empresa, sem necessidade de conhecimentos técnicos avançados."
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: "Segurança de Dados",
      description: "Proteção dos dados dos clientes e empresas com criptografia e conformidade com as leis de privacidade."
    },
    {
      icon: <BarChart className="w-7 h-7" />,
      title: "Dashboard Analítico",
      description: "Acompanhe métricas de atendimento, satisfação do cliente e desempenho do bot em tempo real."
    },
    {
      icon: <Smartphone className="w-7 h-7" />,
      title: "Design Responsivo",
      description: "Funciona perfeitamente em qualquer dispositivo: desktop, tablet ou smartphone."
    },
    {
      icon: <Settings className="w-7 h-7" />,
      title: "Personalização",
      description: "Customize o comportamento do bot, as respostas e a aparência para combinar com a identidade da sua marca."
    },
    {
      icon: <UserCheck className="w-7 h-7" />,
      title: "Suporte Humano Integrado",
      description: "Quando o bot não consegue resolver, a conversa é transferida para um atendente humano sem atrasos."
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: "Base de Conhecimento",
      description: "Adicione documentos, manuais e FAQs para o bot aprender e responder com mais precisão."
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: "IA Adaptativa",
      description: "O bot aprende continuamente com as interações para melhorar suas respostas ao longo do tempo."
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Economize Tempo",
      description: "Reduza em até 80% o tempo gasto com atendimento repetitivo"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Clientes Satisfeitos",
      description: "Melhore a experiência do cliente com respostas imediatas"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Sem Complexidade",
      description: "Interface intuitiva que não requer conhecimento técnico"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Relatórios Detalhados",
      description: "Acesse análises completas do desempenho do seu atendimento"
    }
  ];

  const techStack = [
    { icon: <LayoutDashboard className="w-6 h-6" />, name: "Next.js" },
    { icon: <Cloud className="w-6 h-6" />, name: "Tailwind CSS" },
    { icon: <Database className="w-6 h-6" />, name: "ShadCN UI" },
    { icon: <Globe className="w-6 h-6" />, name: "Node.js" },
    { icon: <Bell className="w-6 h-6" />, name: "Prisma" },
    { icon: <MessageCircle className="w-6 h-6" />, name: "PostgreSQL" },
    { icon: <Brain className="w-6 h-6" />, name: "OpenAI API" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2825eb] via-[#1915eb] to-[#5403d6] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center gap-2 mb-4"
          >
            <motion.div
              animate={{ rotate: 10, scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
              className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
            >
              <Zap className="w-8 h-8 text-yellow-200" />
            </motion.div>
            <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Funcionalidades do AtendeBot
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Descubra as poderosas ferramentas que tornam nosso bot de atendimento a solução ideal para sua empresa
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, staggerChildren: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ 
                y: -10,
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="bg-gradient-to-br from-[#1f1f4d]/80 via-[#383882]/80 to-[#2e2e61]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl hover:shadow-2xl hover:border-purple-400/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-cyan-100">{feature.title}</h3>
              </div>
              <p className="text-blue-100">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Benefícios para Sua Empresa</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                    {benefit.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-white">{benefit.title}</h4>
                </div>
                <p className="text-blue-100 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="mt-20 bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Tecnologias Utilizadas</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7 + index * 0.1 }}
                className="flex items-center gap-2 bg-blue-900/30 px-4 py-2 rounded-full border border-white/10 hover:bg-blue-800/40 transition-colors"
              >
                <div className="text-blue-300">{tech.icon}</div>
                <span className="text-blue-100 font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-br from-[#1f1f4d]/80 via-[#383882]/80 to-[#2e2e61]/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">Pronto para Transformar seu Atendimento?</h3>
            <p className="text-blue-100 max-w-2xl mx-auto mb-6">
              O AtendeBot está em constante evolução para oferecer a melhor experiência de atendimento automatizado. 
              Nossa equipe está sempre trabalhando em novas funcionalidades e melhorias.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button type="1"/>
              <Button type="2"/>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;