import React, { useState } from 'react';
import { ShoppingCart, Phone, Plus, Minus, Trash2 } from 'lucide-react';

const COLORS = [
  { name: 'Branco', hex: '#FFFFFF' },
  { name: 'Preto', hex: '#000000' },
  { name: 'Rosa', hex: '#E74C3C' }, // approximate pink
  { name: 'Azul', hex: '#3498DB' },
  { name: 'Verde', hex: '#2ECC71' },
  { name: 'Amarelo', hex: '#F1C40F' },
  { name: 'Laranja', hex: '#E67E22' },
];

const PRODUCTS = [
  { id: 1, name: 'Chaveiro Gatinho', price: 15, image: '/gatinho.jpg' },
  { id: 2, name: 'Chaveiro Hello Kitty 3D', price: 5, image: '/hello-kitty.jpg' },
  { id: 3, name: 'Chaveiro Polvinho Articulado 3D', price: 15, image: '/polvinho.jpg' },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, color) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.color.name === color.name);
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, color, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (index, delta) => {
    setCart((prev) => {
      const newCart = [...prev];
      const item = newCart[index];
      if (item.quantity + delta > 0) {
        item.quantity += delta;
      } else {
        newCart.splice(index, 1);
      }
      return newCart;
    });
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return;
    let message = 'Olá! Gostaria de fazer o seguinte pedido:\n\n';
    cart.forEach((item) => {
      message += - x  (Cor: ) - R$ \n;
    });
    message += \n*Total: R$ *;
    
    // Substitua pelo número real de WhatsApp da loja
    const phone = '5511999999999'; 
    const url = https://wa.me/?text=;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Mundo da Filó 3D</h1>
          <button 
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2 hover:bg-indigo-700 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Nossos Produtos</h2>
          <p className="mt-4 text-lg text-gray-600">Peças impressas em 3D com alta qualidade. Escolha seu favorito e sua cor!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      </main>

      {/* Cart Sidebar/Modal (Simple implementation) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Seu Carrinho
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-black font-bold text-xl">&times;</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">O carrinho está vazio.</p>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4 border-b pb-4">
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-sm">{item.product.name}</h4>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        Cor: <span className="w-3 h-3 rounded-full inline-block border border-gray-300" style={{backgroundColor: item.color.hex}}></span> {item.color.name}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="font-bold text-indigo-600">R$ {item.product.price.toFixed(2)}</div>
                        <div className="flex items-center gap-2 border rounded-md px-2 py-1">
                          <button onClick={() => updateQuantity(idx, -1)} className="text-gray-500 hover:text-black"><Minus className="w-3 h-3"/></button>
                          <span className="text-sm w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(idx, 1)} className="text-gray-500 hover:text-black"><Plus className="w-3 h-3"/></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-4 text-lg font-bold">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={checkoutWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg flex justify-center items-center gap-2 transition-colors"
                >
                  <Phone className="w-5 h-5" /> Fazer Pedido via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square w-full relative overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-xl text-gray-900 mb-1">{product.name}</h3>
        <p className="text-2xl font-extrabold text-indigo-600 mb-4">R$ {product.price.toFixed(2)}</p>
        
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Cores disponíveis: <span className="font-bold text-gray-900">{selectedColor.name}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(color => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={w-8 h-8 rounded-full border-2 transition-transform }
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
        
        <button 
          onClick={() => onAdd(product, selectedColor)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl flex justify-center items-center gap-2 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" /> Adicionar
        </button>
      </div>
    </div>
  );
}
