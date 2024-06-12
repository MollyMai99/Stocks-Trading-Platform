import backgroundImage from "../../public/background.jpeg";
// import backgroundImage from "/Users/lingling/sei/project/Stocks-Trading-Platform/client/public/6.jpeg";

export default function HomePage() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // 确保背景图片覆盖整个视窗高度
        color: "white", // 根据背景图片的颜色调整字体颜色
        padding: "20px",
        margin: 0,
      }}
    >
      <h1>Welcome to our website!</h1>
      <br />
      <p>
        This is a platform where users can trade stocks! It has the following
        features:
      </p>
      <ul>
        <li>View a list of stocks and the latest price for each stock</li>
        <li>Buy stocks</li>
        <li>Deposit or withdraw funds in your wallet</li>
      </ul>
      <br />
      <p>More features coming soon:</p>
      <ul>
        <li>Sell stocks</li>
        <li>View the latest exchange rates and trade currencies</li>
        <li>View price charts for each stock</li>
      </ul>
      <br />
      <p>
        <a href="/stocks">View Stocks</a>
      </p>
    </div>
  );
}
