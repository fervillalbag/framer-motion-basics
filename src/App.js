import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

const buttonVariants = {
  visible: {
    x: [0, -20, 20, -20, 0],
    transition: { delay: 2 }
  },
  hover: {
    scale: 1.1,
    transition: {
      /* Esto permite que se repita x veces la animación */
      yoyo: 10 /* x | Infinity */
    }
  }
};

const containerVariants = {
  hidden: {
    opacity: 0,
    y: "-100vh"
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.5, duration: 0.6, when: "beforeChildren" }
  }
};

const itemsContainer = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.4 }
  }
};

const itemsAnimation = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
};

/*
  No es necesario aplicar el initial=".." y animate=".."
  cuando ya existe un motion padre definido, esto permite
  la propagación de las propiedades

  La propiedad when dentro de transition nos permite
  que la animación se ejecute una vez finalice la anterior

  StaggerChildren nos permite que se ejecute cada animación
  una vez termine la anterior. Normalmente se utiliza al mostrar
  componentes hijos

  exit puede utilizarse como hidden y visible dentro del objeto
  las propiedades se aplicaran una vez la página sea desmontada
*/

export default function App() {
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    let timer1 = setTimeout(() => setShowTitle(false), 2000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="App"
      >
        <AnimatePresence>
          {showTitle && (
            <motion.h1
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ delay: 1, type: "spring", stiffness: 120 }}
              exit={{ y: "-100vh" }}
            >
              Hello CodeSandbox
            </motion.h1>
          )}
        </AnimatePresence>

        <motion.p>Start editing to see some magic happen!</motion.p>

        <motion.button whileHover={{ backgroundColor: "rgb(32, 32, 32)" }}>
          Hello World
        </motion.button>

        <motion.button
          className="second-button"
          animate="visible"
          variants={buttonVariants}
          whileHover="hover"
        >
          This is a different button
        </motion.button>

        <motion.ul
          variants={itemsContainer}
          style={{ listStyle: "none", padding: 0 }}
        >
          <motion.li variants={itemsAnimation}>Hello</motion.li>
          <motion.li variants={itemsAnimation}>My name is</motion.li>
          <motion.li variants={itemsAnimation}>Fernando</motion.li>
        </motion.ul>
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Hello again
      </motion.p>
    </>
  );
}
