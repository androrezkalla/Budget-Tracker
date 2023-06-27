import 'tailwindcss/tailwind.css';
import TransactionList from './components/TransactionList';
import Sidebar from './components/SideBar';
import Banner from './components/Banner';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Banner />
      <div className="flex-1 overflow-y-auto">
        <main className="container mx-auto py-20 px-20 text-center">
          <Sidebar />
          <TransactionList />
        </main>
      </div>
    </div>
  );
}

export default App;
