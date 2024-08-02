import Body from "../components/Body";
import RefrigelLogo from "../icons/logo";

export default async function RefrigelHomePage() {
  return (
    <Body>
      <main className="flex min-h-screen items-center justify-center">
        <RefrigelLogo size="720" color="#dadada" />
      </main>
    </Body>
  );
}
