import rocket from "/home/josepferrer/BootCamp/Spare/my-turborepo/apps/client/src/utils/rocket.png";
import rocketspareman from "/home/josepferrer/BootCamp/Spare2/Spare/apps/client/src/utils/roketspareman.png";
function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <p className="py-10 text-lg font-semibold">
        Please connect your wallet to start using SPARE
      </p>
      <img src={rocketspareman} alt="Rocket" className="h-60 mx-auto" />
    </div>
  );
}

export default WelcomeScreen;
