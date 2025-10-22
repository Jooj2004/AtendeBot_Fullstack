"use client";
import { motion } from "framer-motion";
import { Button } from "./button";

export const Body = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-[80%] mx-auto flex flex-col sm:flex-row"
    >
      <motion.div 
        className="mb-2 sm:flex-1"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-2">
          <motion.h1 
            className="text-3xl lg:text-5xl text-white font-semibold"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Atendimento ao Cliente com IA
          </motion.h1>
          <motion.p 
            className="text-white lg:text-lg text-sm mb-4"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Plataforma de chatbot personalizável para automatizar o suporte ao cliente.
          </motion.p>
        </div>
        <motion.div 
          className="flex gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button type={'1'}/>
          <Button type={'2'}/>
        </motion.div>
      </motion.div>

      <motion.div 
        className="flex w-full h-[190px] sm:h-[250px] lg:h-[280px] justify-end py-5"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="grid grid-rows-3 grid-cols-2">
          <motion.div 
            className="z-10 min-w-34 h-10 pl-3 bounce2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
          >
            <div className="bg-blue-600 rounded-lg p-2 text-xs text-white shadow-md lg:text-[15px]">
              <p>Opa, Como posso ajudar você?</p>
            </div>
          </motion.div>

          <motion.div 
            className="min-w-32 bounce"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.0, type: "spring", stiffness: 100 }}
          >
            <div className="text-xs rounded-lg p-2 bg-violet-900 shadow-md text-white lg:text-[15px]">
              Quais são os planos disponíveis?
            </div>
          </motion.div>

          <motion.div 
            className="min-w-32 max-w-64 pl-4 bounce3"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
          >
            <div className="text-[10px] rounded-lg p-2 bg-blue-950 shadow-md text-white">
              Experimente um chatbot poderoso
            </div>
          </motion.div>

          <motion.div 
            className="col-start-2 h-full w-24 lg:w-[130px] sm:w-32 p-2 ml-1 row-start-1 row-end-4 bounce2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            whileHover={{ y: -5 }}
          >
            <img 
              className="h-full w-full" 
              src="assets/robo.png" 
              alt="robo-chatbot" 
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
}