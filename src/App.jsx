import 'tailwindcss/tailwind.css';
import TransactionList from './components/TransactionList';

function App() {
  return (
    <main className="container mx-auto py-1 text-center">
      <h1 className="text-5xl font-bold mb-4">Budget Tracker</h1>
      <TransactionList />

    </main>
  );
}

export default App;
