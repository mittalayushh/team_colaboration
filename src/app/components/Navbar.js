import React from 'react'

export default function Navbar() {
  const items = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ]
  return (
    <nav>
      <ul className="flex space-x-4">
        {items.map((item) => (
          <li key={item.name}>
            <a href={item.href} className="text-blue-500 hover:text-blue-700">
              {item.name}
            </a>
          </li>
        ))}
      </ul> 
    </nav>
  )
}
