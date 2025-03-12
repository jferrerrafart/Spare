import rocket from "/home/josepferrer/BootCamp/Spare/my-turborepo/apps/client/src/utils/rocket.png";

function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-40">
      <p className="py-10 text-lg font-semibold">
        Please connect your wallet to start using SPARE
      </p>
      <img src={rocket} alt="Rocket" className="h-35 mx-auto" />
    </div>
  );
}

export default WelcomeScreen;
