// Oluşturduğumuz Button bileşenini import ediyoruz
import Button from './components/base/Button';
import logo from './assets/react.svg'; // Vite'ın logosunu kullanalım

function App() {
  const handleButtonClick = () => {
    alert('Butona tıklandı!');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
      <img src={logo} className="h-24 w-24 animate-spin mb-8" alt="logo" />
      <h1 className="text-4xl font-bold mb-4">
        Vite + React + TypeScript + Tailwind
      </h1>
      <p className="text-lg text-gray-400 mb-8">
        Modüler dosya yapısı ile projemiz hazır!
      </p>

      <div className="flex gap-4">
          <Button onClick={handleButtonClick}>
            Bana Tıkla!
          </Button>
          <Button onClick={() => alert("Diğer butona tıklandı!")} className="bg-green-600 hover:bg-green-800">
            Diğer Buton
          </Button>
      </div>
    </div>
  );
}

export default App;