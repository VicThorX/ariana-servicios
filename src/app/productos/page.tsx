"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { catalogProducts, Product } from "@/data/products";
import { submitOrderForm } from "@/app/actions/order";
import { 
  ShoppingCart, ShoppingBag, Plus, Minus, Trash2, X, 
  Send, Loader2, CheckCircle2, AlertCircle, Sparkles, AlertTriangle 
} from "lucide-react";

interface CartItem extends Product {
  quantity: number;
}

export default function ProductsCatalogPage() {
  // Catalog & Filtering
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  
  // Shopping Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Quantities for catalog items (item.id -> quantity)
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("ariana-cart");
    if (savedCart) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading cart:", e);
      }
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("ariana-cart", JSON.stringify(newCart));
  };

  // Filtered Products
  const filteredProducts = activeCategory === "todos" 
    ? catalogProducts
    : catalogProducts.filter(p => p.category === activeCategory);

  // Cart operations
  const addToCart = (product: Product, quantity: number) => {
    if (quantity <= 0) return;
    
    const newCart = [...cart];
    const existingIndex = newCart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({ ...product, quantity });
    }

    saveCart(newCart);
    
    // Reset selection quantity for catalog
    setItemQuantities(prev => ({ ...prev, [product.id]: 1 }));
    
    // Open cart drawer
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    const newCart = cart.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    saveCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(item => item.id !== productId);
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  // Cart Totals
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Initializing quantity selectors in catalog
  const getCatalogQuantity = (productId: string) => {
    return itemQuantities[productId] || 1;
  };

  const adjustCatalogQuantity = (productId: string, delta: number) => {
    const current = getCatalogQuantity(productId);
    const newVal = current + delta;
    setItemQuantities(prev => ({ ...prev, [productId]: newVal > 0 ? newVal : 1 }));
  };

  // Checkout submission
  const handleCheckoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback({ type: null, message: '' });
    setErrors({});

    const form = e.currentTarget;
    const formFields = new FormData(form);

    const name = (formFields.get("name") as string).trim();
    const email = (formFields.get("email") as string).trim();
    const phone = (formFields.get("phone") as string).trim();
    const address = (formFields.get("address") as string).trim();
    const notes = (formFields.get("notes") as string).trim();
    const method = formFields.get("checkoutMethod") as string;

    const newErrors: Record<string, string> = {};
    if (!name) newErrors.name = "Por favor, ingresa tu nombre completo.";
    if (!email) {
      newErrors.email = "Ingresa tu email para coordinar.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "El correo no parece ser válido.";
    }
    if (!phone) newErrors.phone = "Ingresa tu teléfono celular.";
    if (!address) newErrors.address = "Ingresa la dirección para la entrega.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    const orderItems = cart.map(item => ({
      title: item.title,
      quantity: item.quantity,
      price: item.price
    }));

    if (method === "whatsapp") {
      // 1. Envío por WhatsApp
      let message = `🛒 *Nuevo Pedido - Ariana Insumos*\n\n`;
      message += `*Cliente:* ${name}\n`;
      message += `*Email:* ${email}\n`;
      message += `*Teléfono:* ${phone}\n`;
      message += `*Dirección Entrega:* ${address}\n`;
      if (notes) {
        message += `*Notas:* ${notes}\n`;
      }
      message += `\n*Detalle de Insumos:*\n`;
      
      cart.forEach(item => {
        message += `• ${item.quantity}x ${item.title} (_$${item.price} c/u_)\n`;
      });
      
      message += `\n*Total Estimado:* $${cartSubtotal}\n\n`;
      message += `_Los precios quedan sujetos a confirmación comercial de stock y facturación (A o B)._`;

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/5492235220338?text=${encoded}`, "_blank");
      
      setIsSubmitting(false);
      setFeedback({ 
        type: 'success', 
        message: "¡Pedido armado! Se abrió WhatsApp para enviar la confirmación a nuestro asesor." 
      });
      clearCart();
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
    } else {
      // 2. Envío por Email (Server Action)
      const submissionData = new FormData();
      submissionData.append("name", name);
      submissionData.append("email", email);
      submissionData.append("phone", phone);
      submissionData.append("address", address);
      submissionData.append("notes", notes);
      submissionData.append("items", JSON.stringify(orderItems));

      const response = await submitOrderForm(submissionData);

      setIsSubmitting(false);
      if (response.success) {
        setFeedback({ type: 'success', message: response.message });
        form.reset();
        clearCart();
        setTimeout(() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(false);
          setFeedback({ type: null, message: '' });
        }, 5000);
      } else {
        setFeedback({ type: 'error', message: response.message });
      }
    }
  };

  const categories = [
    { id: "todos", label: "Todos los Insumos" },
    { id: "limpiadores", label: "Limpiadores Activos" },
    { id: "insumos", label: "Insumos Corporativos" },
    { id: "ecologicos", label: "Línea Ecológica" },
    { id: "accesorios", label: "Accesorios y Papel" }
  ];

  return (
    <main className="min-h-screen pt-28 pb-20 bg-brand-50/20 dark:bg-slate-950 relative overflow-x-clip">
      {/* Fondos estéticos */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-200/10 dark:bg-brand-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/20 dark:bg-purple-950/5 blur-[130px] rounded-full pointer-events-none -translate-x-1/3" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Encabezado */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/50 dark:bg-slate-800 text-brand-700 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-4 border border-brand-100 dark:border-slate-700"
          >
            <Sparkles className="w-3.5 h-3.5" /> Insumos Químicos y Accesorios
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-850 dark:text-white mb-6"
          >
            Catálogo de <span className="text-brand-600 dark:text-brand-400">Productos</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-650 dark:text-slate-400 font-medium"
          >
            Proveemos insumos de limpieza profesionales a consorcios, industrias y oficinas. 
            Armá tu carrito de consultas y recibí una cotización cerrada ajustada a tu volumen.
          </motion.p>
        </div>

        {/* Barra de Filtros por Categoría */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-3 rounded-full text-sm font-bold border transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/10"
                  : "bg-white dark:bg-slate-900 border-brand-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-brand-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grilla de Productos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-brand-100 dark:border-slate-800/80 shadow-xl overflow-hidden flex flex-col justify-between group"
              >
                {/* Imagen del producto */}
                <div className="relative h-60 w-full bg-brand-50/50 dark:bg-slate-950/40 overflow-hidden flex items-center justify-center border-b border-brand-50 dark:border-slate-800">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur border border-brand-100 dark:border-slate-800 text-xs font-extrabold text-brand-650 dark:text-brand-400 uppercase tracking-wide shadow-sm">
                    {product.packSize}
                  </span>
                </div>

                {/* Detalles */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-855 dark:text-white mb-2 leading-tight">
                      {product.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 font-medium leading-relaxed">
                      {product.description}
                    </p>

                    {/* Especificaciones */}
                    {product.specs && (
                      <ul className="space-y-1.5 mb-6 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                        {product.specs.map((spec, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    {/* Fila de precio e interactividad */}
                    <div className="flex items-center justify-between border-t border-brand-50 dark:border-slate-800/60 pt-6">
                      <div>
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase">Precio ref.</span>
                        <span className="text-2xl font-extrabold text-slate-850 dark:text-white">${product.price}</span>
                      </div>

                      {/* Selectores de Cantidad */}
                      <div className="flex items-center gap-3 bg-brand-50/50 dark:bg-slate-850 px-3.5 py-2 rounded-xl border border-brand-100/50 dark:border-slate-750">
                        <button
                          type="button"
                          onClick={() => adjustCatalogQuantity(product.id, -1)}
                          className="text-slate-500 dark:text-slate-400 hover:text-brand-500 p-0.5"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-bold text-slate-800 dark:text-white min-w-[16px] text-center">
                          {getCatalogQuantity(product.id)}
                        </span>
                        <button
                          type="button"
                          onClick={() => adjustCatalogQuantity(product.id, 1)}
                          className="text-slate-500 dark:text-slate-400 hover:text-brand-500 p-0.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Botón Añadir */}
                    <button
                      onClick={() => addToCart(product, getCatalogQuantity(product.id))}
                      className="w-full mt-5 py-3.5 bg-brand-500 hover:bg-brand-650 dark:bg-brand-650 dark:hover:bg-brand-700 text-white font-bold rounded-2xl text-sm transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 group shadow-lg shadow-brand-500/10"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Agregar al Pedido
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Alerta de Precios provisionales */}
        <div className="mt-16 p-6 rounded-2xl bg-amber-50 dark:bg-slate-900 border border-amber-200 dark:border-slate-800 flex items-start gap-4 max-w-3xl mx-auto">
          <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-slate-800 dark:text-white text-sm">Precios Referenciales</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
              Los valores expresados son precios de referencia y se encuentran sujetos a variaciones según stock, facturación e impuestos (IVA). Una vez solicitado el presupuesto, nuestro sector comercial coordinará contigo las bonificaciones por volumen.
            </p>
          </div>
        </div>
      </div>

      {/* Botón flotante del carrito */}
      <AnimatePresence>
        {totalItemsCount > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-24 right-5 z-40 w-16 h-16 bg-brand-500 dark:bg-brand-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-brand-600 dark:hover:bg-brand-700 transition-all hover:scale-105 active:scale-95 group"
            title="Ver carrito de pedido"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#d5366c] border-2 border-white dark:border-slate-950 rounded-full flex items-center justify-center text-xs font-bold text-white group-hover:scale-110 transition-transform">
              {totalItemsCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* DRAWER DEL CARRITO (Slide-over) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Fondo Oscuro / Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isCheckoutOpen) setIsCartOpen(false);
              }}
              className="fixed inset-0 bg-black z-40 cursor-pointer"
            />

            {/* Panel lateral */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 border-l border-brand-100 dark:border-slate-800 flex flex-col justify-between overflow-hidden"
            >
              {/* Header Drawer */}
              <div className="p-6 border-b border-brand-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-brand-500" />
                  <h2 className="text-lg font-bold text-slate-850 dark:text-white">Detalle de tu Pedido</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 hover:bg-brand-50 dark:hover:bg-slate-850 rounded-full text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contenido Drawer */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {!isCheckoutOpen ? (
                  // Vista 1: Listado de artículos en el carrito
                  cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                      <ShoppingBag className="w-12 h-12 text-slate-300 mb-4 stroke-[1.5]" />
                      <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">Tu carrito está vacío</p>
                      <p className="text-slate-400 text-xs mt-1">Elegí insumos del catálogo para solicitar cotización.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 bg-brand-50/40 dark:bg-slate-950/20 rounded-2xl border border-brand-50 dark:border-slate-800/60 relative group">
                          {/* Miniatura */}
                          <div className="w-16 h-16 shrink-0 rounded-xl bg-white dark:bg-slate-900 border border-brand-100 dark:border-slate-800 overflow-hidden flex items-center justify-center">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-800 dark:text-white text-sm truncate pr-6">{item.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.packSize}</p>
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-sm font-extrabold text-slate-850 dark:text-white">${item.price * item.quantity}</span>
                              
                              {/* Ajustador de cantidad */}
                              <div className="flex items-center gap-2.5 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-brand-100 dark:border-slate-800">
                                <button
                                  onClick={() => updateCartQuantity(item.id, -1)}
                                  className="text-slate-400 hover:text-brand-500"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-xs font-bold text-slate-800 dark:text-white min-w-[12px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateCartQuantity(item.id, 1)}
                                  className="text-slate-400 hover:text-brand-500"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Eliminar */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Quitar del carrito"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      {/* Botón de limpiar carrito */}
                      <button
                        onClick={clearCart}
                        className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1.5 ml-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Vaciar Carrito
                      </button>
                    </div>
                  )
                ) : (
                  // Vista 2: Formulario de Checkout
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 text-xs text-brand-650 dark:text-brand-400 font-bold border-b border-brand-50 dark:border-slate-800/80 pb-3 mb-2">
                      <span>✓ Items listos</span>
                      <span>• Datos de entrega</span>
                    </div>

                    <form id="checkoutForm" onSubmit={handleCheckoutSubmit} className="space-y-4">
                      <input type="hidden" name="items" value={JSON.stringify(cart.map(i => ({ title: i.title, quantity: i.quantity, price: i.price })))} />
                      
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-350">Nombre / Consorcio *</label>
                        <input
                          name="name"
                          type="text"
                          required
                          className={`w-full px-4 py-3 text-sm rounded-xl border bg-brand-50/20 dark:bg-slate-850 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-brand-500 ${errors.name ? 'border-red-400' : 'border-brand-100 dark:border-slate-750'}`}
                          placeholder="Ej. Consorcio Colón 1200"
                        />
                        {errors.name && <p className="text-[10px] text-red-500 flex items-center gap-0.5"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-350">Email de contacto *</label>
                        <input
                          name="email"
                          type="email"
                          required
                          className={`w-full px-4 py-3 text-sm rounded-xl border bg-brand-50/20 dark:bg-slate-850 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-brand-500 ${errors.email ? 'border-red-400' : 'border-brand-100 dark:border-slate-750'}`}
                          placeholder="correo@ejemplo.com"
                        />
                        {errors.email && <p className="text-[10px] text-red-500 flex items-center gap-0.5"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-350">Teléfono móvil / WhatsApp *</label>
                        <input
                          name="phone"
                          type="tel"
                          required
                          className={`w-full px-4 py-3 text-sm rounded-xl border bg-brand-50/20 dark:bg-slate-850 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-brand-500 ${errors.phone ? 'border-red-400' : 'border-brand-100 dark:border-slate-750'}`}
                          placeholder="Ej. 223 5123456"
                        />
                        {errors.phone && <p className="text-[10px] text-red-500 flex items-center gap-0.5"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-350">Dirección de entrega *</label>
                        <input
                          name="address"
                          type="text"
                          required
                          className={`w-full px-4 py-3 text-sm rounded-xl border bg-brand-50/20 dark:bg-slate-850 text-slate-850 dark:text-white outline-none focus:ring-1 focus:ring-brand-500 ${errors.address ? 'border-red-400' : 'border-brand-100 dark:border-slate-750'}`}
                          placeholder="Ej. Av. Colón 1250, Piso 2A"
                        />
                        {errors.address && <p className="text-[10px] text-red-500 flex items-center gap-0.5"><AlertCircle className="w-3 h-3" />{errors.address}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-350">Notas adicionales (Opcional)</label>
                        <textarea
                          name="notes"
                          rows={3}
                          className="w-full px-4 py-3 text-sm rounded-xl border border-brand-100 dark:border-slate-750 bg-brand-50/20 dark:bg-slate-850 text-slate-850 dark:text-white outline-none resize-none focus:ring-1 focus:ring-brand-500"
                          placeholder="Indicaciones para la entrega o facturación..."
                        ></textarea>
                      </div>

                      {/* Método de checkout */}
                      <div className="space-y-2 border-t border-brand-50 dark:border-slate-800/80 pt-4 mt-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-350 block">Seleccioná cómo finalizar:</label>
                        <div className="grid grid-cols-2 gap-3">
                          <label className="flex items-center justify-center gap-2 p-3 border rounded-xl border-brand-100 dark:border-slate-850 cursor-pointer bg-brand-50/10 hover:bg-brand-50/30 dark:hover:bg-slate-850/30 font-medium text-slate-800 dark:text-white text-xs">
                            <input type="radio" name="checkoutMethod" value="email" defaultChecked />
                            Vía Email
                          </label>
                          <label className="flex items-center justify-center gap-2 p-3 border rounded-xl border-brand-100 dark:border-slate-850 cursor-pointer bg-brand-50/10 hover:bg-brand-50/30 dark:hover:bg-slate-850/30 font-medium text-slate-850 dark:text-white text-xs">
                            <input type="radio" name="checkoutMethod" value="whatsapp" />
                            Vía WhatsApp
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Footer Drawer (Resumen y CTA) */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-brand-100 dark:border-slate-800/80 bg-brand-50/30 dark:bg-slate-950/20 space-y-4">
                  
                  {/* Totales */}
                  <div className="space-y-1.5 text-slate-750 dark:text-slate-300">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Cantidad de artículos:</span>
                      <span>{totalItemsCount} unid.</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold border-t border-brand-100/50 dark:border-slate-800/40 pt-3 text-slate-850 dark:text-white">
                      <span>Total estimado:</span>
                      <span>${cartSubtotal}</span>
                    </div>
                  </div>

                  {feedback.type && (
                    <div className={`p-4 rounded-xl flex items-center gap-2 text-xs font-semibold border ${feedback.type === 'success' ? 'bg-teal-50 text-teal-800 dark:bg-emerald-950/30 dark:text-emerald-400 border-teal-200' : 'bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-400 border-red-200'}`}>
                      {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                      <p>{feedback.message}</p>
                    </div>
                  )}

                  {/* Botones de acción */}
                  <div className="space-y-2">
                    {!isCheckoutOpen ? (
                      <button
                        onClick={() => setIsCheckoutOpen(true)}
                        className="w-full py-4 bg-brand-500 hover:bg-brand-650 dark:bg-brand-650 dark:hover:bg-brand-700 text-white font-bold rounded-2xl text-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
                      >
                        Iniciar Cotización del Pedido
                      </button>
                    ) : (
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setIsCheckoutOpen(false)}
                          className="py-4 border border-brand-200 dark:border-slate-800 hover:border-brand-400 text-slate-700 dark:text-slate-300 font-bold rounded-2xl text-sm transition-all active:scale-[0.99] bg-white dark:bg-slate-900"
                          disabled={isSubmitting}
                        >
                          Atrás
                        </button>
                        <button
                          type="submit"
                          form="checkoutForm"
                          disabled={isSubmitting}
                          className="py-4 bg-brand-500 hover:bg-brand-650 dark:bg-brand-650 dark:hover:bg-brand-700 text-white font-bold rounded-2xl text-sm transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              Enviar Pedido
                              <Send className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </main>
  );
}
