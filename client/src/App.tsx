import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import MessageBlock from './pages/MessageBlock'

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MessageBlock />
      </QueryClientProvider>
    </>
  )
}

export default App
