import React, { useState } from 'react';
import styles from './navbar.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';


export default function Navbar({ children, home }) {
    const [currentHovering, setCurrentHovering] = useState('');

    return (
        <section className={`${utilStyles.container55}`}>
            <div className={`${styles.bar}`}>
                <div className={styles.left}>
                    <NavLink href="/" text="claire zhang." currentHovering={currentHovering} setHovering={setCurrentHovering}/>
                </div>
                <div className={styles.right}>
                    <NavLink href="/learning" text="👩‍💻" currentHovering={currentHovering} setHovering={setCurrentHovering}/>
                    <NavLink href="/writing" text="📃" currentHovering={currentHovering} setHovering={setCurrentHovering}/>
                    {/* <NavLink href="/valentine" text="🐹" currentHovering={currentHovering} setHovering={setCurrentHovering}/> */}
                </div>
            </div>
            
        </section>

    );
  }

  function NavLink({href, text, currentHovering, setHovering}) {
    return <Link onMouseEnter={() => setHovering(href)} 
    onMouseLeave={() => setHovering('')} 
    className={styles.item} 
    style={currentHovering && currentHovering !== href ? {opacity: 0.5} : {opacity: 1} }
    href={href}>{text}</Link>
  }