import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Globe, ArrowRight, Menu, X, Code, Terminal, Cloud, Github, FileCode } from 'lucide-react';

export default function FuturisticLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('vercel');
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxOffset = scrollY * 0.5;

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, id }) => (
    <div className="relative group">
      <pre className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 overflow-x-auto text-sm">
        <code className="text-green-400">{code}</code>
      </pre>
      <button
        onClick={() => copyToClipboard(code, id)}
        className="absolute top-2 right-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        {copiedCode === id ? '✓ Copié!' : 'Copier'}
      </button>
    </div>
  );

  const deploymentMethods = {
    vercel: {
      title: 'Vercel',
      icon: Cloud,
      time: '10 min',
      difficulty: 'Facile',
      steps: [
        {
          title: 'Installation des dépendances',
          code: `npx create-react-app nexus-landing
cd nexus-landing
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`
        },
        {
          title: 'Configuration Tailwind CSS',
          description: 'Remplacez le contenu de tailwind.config.js :',
          code: `module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}`
        },
        {
          title: 'Déploiement',
          description: 'Option CLI (recommandée) :',
          code: `npm install -g vercel
vercel login
vercel --prod`
        }
      ]
    },
    netlify: {
      title: 'Netlify',
      icon: Globe,
      time: '8 min',
      difficulty: 'Très facile',
      steps: [
        {
          title: 'Build du projet',
          code: `npm run build`
        },
        {
          title: 'Déploiement via CLI',
          code: `npm install -g netlify-cli
netlify login
netlify deploy --prod`
        },
        {
          title: 'Ou glisser-déposer',
          description: 'Allez sur netlify.com et glissez le dossier build/'
        }
      ]
    },
    github: {
      title: 'GitHub Pages',
      icon: Github,
      time: '15 min',
      difficulty: 'Moyen',
      steps: [
        {
          title: 'Installer gh-pages',
          code: `npm install --save-dev gh-pages`
        },
        {
          title: 'Ajouter dans package.json',
          code: `"homepage": "https://username.github.io/nexus-landing",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}`
        },
        {
          title: 'Déployer',
          code: `npm run deploy`
        }
      ]
    }
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.3), transparent 50%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 backdrop-blur-md bg-black/30 border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            NEXUS
          </div>
          
          <div className="hidden md:flex space-x-8">
            {[
              { name: 'Accueil', href: '#home' },
              { name: 'Features', href: '#features' },
              { name: 'Déploiement', href: '#deployment' },
              { name: 'Contact', href: '#contact' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-purple-400 transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div 
          className="text-center"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
            <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-sm">Nouvelle ère technologique</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
              L'avenir
            </span>
            <br />
            commence ici
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Découvrez une nouvelle dimension de l'innovation avec des solutions qui repoussent les limites du possible
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#deployment"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <span>Déployer maintenant</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            
            <a 
              href="#features"
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              En savoir plus
            </a>
          </div>
        </div>

        {/* 3D Card */}
        <div className="mt-20 relative">
          <div 
            className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 group"
            style={{
              transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth / 2) / 100}deg) rotateX(${-(mousePosition.y - window.innerHeight / 2) / 100}deg)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative grid md:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: 'Ultra Rapide', desc: 'Performance optimale en temps réel' },
                { icon: Globe, title: 'Global', desc: 'Disponible partout dans le monde' },
                { icon: Sparkles, title: 'Innovant', desc: 'Technologie de pointe' },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-6">
              Expérience
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> immersive</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Plongez dans un univers où la technologie et l'imagination se rencontrent pour créer des expériences extraordinaires qui transforment votre vision du possible.
            </p>
            <div className="space-y-4">
              {['Intelligence artificielle avancée', 'Interface intuitive', 'Sécurité maximale'].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full group-hover:scale-150 transition-transform duration-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-3xl backdrop-blur-sm border border-white/10 p-12 hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full border-4 border-dashed border-white/20 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-24 h-24 mx-auto mb-4 text-purple-400 animate-spin" style={{ animationDuration: '10s' }} />
                  <p className="text-2xl font-bold">Connecté au monde</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Guide Section */}
      <section id="deployment" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span className="text-sm">Guide de déploiement intégré</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Déployez en
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> quelques minutes</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Suivez notre guide étape par étape pour mettre votre site en ligne gratuitement
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(deploymentMethods).map(([key, method]) => {
            const Icon = method.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`group px-6 py-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-purple-400/50 shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-6 h-6 ${activeTab === key ? 'text-purple-400' : 'text-gray-400'}`} />
                  <div className="text-left">
                    <div className="font-bold">{method.title}</div>
                    <div className="text-xs text-gray-400">{method.time} • {method.difficulty}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-purple-900/10 to-blue-900/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
          {Object.entries(deploymentMethods).map(([key, method]) => (
            activeTab === key && (
              <div key={key} className="space-y-8">
                {method.steps.map((step, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                    </div>
                    
                    {step.description && (
                      <p className="text-gray-400 ml-11">{step.description}</p>
                    )}
                    
                    {step.code && (
                      <div className="ml-11">
                        <CodeBlock code={step.code} id={`${key}-${index}`} />
                      </div>
                    )}
                  </div>
                ))}

                <div className="mt-8 p-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/20 rounded-2xl">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-green-400 mb-2">Résultat attendu</h4>
                      <p className="text-gray-300">
                        Votre site sera accessible via une URL du type : <code className="px-2 py-1 bg-black/30 rounded text-purple-400">https://nexus-landing.{key === 'vercel' ? 'vercel.app' : key === 'netlify' ? 'netlify.app' : 'github.io'}</code>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Quick Tips */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { icon: Code, title: 'Code source', desc: 'Copiez le code de cet artifact dans App.js' },
            { icon: FileCode, title: 'Tailwind CSS', desc: 'N\'oubliez pas de configurer Tailwind' },
            { icon: Terminal, title: 'Test local', desc: 'Testez avec npm start avant de déployer' },
          ].map((tip, i) => (
            <div
              key={i}
              className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
            >
              <tip.icon className="w-8 h-8 text-purple-400 mb-3" />
              <h4 className="font-bold mb-2">{tip.title}</h4>
              <p className="text-sm text-gray-400">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 animate-pulse" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Prêt à transformer
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                votre vision ?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d'innovateurs qui ont déjà franchi le pas vers le futur
            </p>
            <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-110 transition-transform duration-300 hover:shadow-2xl hover:shadow-white/50">
              Démarrer gratuitement
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center text-gray-500">
          <p>© 2025 NEXUS. Conçu pour l'avenir. Guide de déploiement intégré.</p>
        </div>
      </footer>
    </div>
  );
}
