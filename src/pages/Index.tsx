
import DressUpApp from '@/components/DressUpApp';

const Index = () => {
  return (
    <div 
      className="min-h-screen w-full flex flex-col justify-center items-center py-8"
      style={{
        background: `url('/assets/background-pattern.png')`,
        backgroundSize: '200px',
        backgroundRepeat: 'repeat',
      }}
    >
      <DressUpApp />
    </div>
  );
};

export default Index;
