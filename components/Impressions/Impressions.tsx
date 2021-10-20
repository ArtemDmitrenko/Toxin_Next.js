const Impressions = () => {
  const a = 0;
  return (
    <div>
      <div>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <linearGradient id="linear-gradient-yellow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFE39C" />
            <stop offset="100%" stopColor="#FFBA9C" />
          </linearGradient>
          <linearGradient id="linear-gradient-green" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#6FCF97" />
            <stop offset="100%" stopColor="#66D2EA" />
          </linearGradient>
          <linearGradient id="linear-gradient-purple" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#BC9CFF" />
            <stop offset="100%" stopColor="#8BA4F9" />
          </linearGradient>
          <linearGradient id="linear-gradient-black" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#909090" />
            <stop offset="100%" stopColor="#3D4975" />
          </linearGradient>
        </svg>
        <h1>
          260
          <br />
          <span>голосов</span>
        </h1>
      </div>
      <div>
        <ul>
          <li>Великолепно</li>
          <li>Хорошо</li>
          <li>Удовлетворительно</li>
          <li>Разочарован</li>
        </ul>

      </div>
    </div>
  );
};



// mixin diagram(options)
//     - const {good, amazing, notbad, bad} = options
//     .diagram.js-diagram(data-good=good data-amazing=amazing data-notbad=notbad data-bad=bad)
//         .diagram__block
//             svg.diagram__chart.js-diagram__chart(width="120" height="120" viewBox="0 0 120 120")
//                 linearGradient(id="linear-gradient-yellow" x1="0" x2="0" y1="0" y2="1")
//                     stop(offset="0%" stop-color="#FFE39C")
//                     stop(offset="100%" stop-color="#FFBA9C")
//                 linearGradient(id="linear-gradient-green" x1="0" x2="0" y1="0" y2="1")
//                     stop(offset="0%" stop-color="#6FCF97")
//                     stop(offset="100%" stop-color="#66D2EA")
//                 linearGradient(id="linear-gradient-purple" x1="0" x2="0" y1="0" y2="1")
//                     stop(offset="0%" stop-color="#BC9CFF")
//                     stop(offset="100%" stop-color="#8BA4F9")
//                 linearGradient(id="linear-gradient-black" x1="0" x2="0" y1="0" y2="1")
//                     stop(offset="0%" stop-color="#909090")
//                     stop(offset="100%" stop-color="#3D4975")
//             h1.diagram__total.js-diagram__total 260<br><span>голосов</span>
//         .diagram__legend
//             ul.diagram__list
//                 li.diagram__list-item.diagram__list-item_description_amazing Великолепно
//                 li.diagram__list-item.diagram__list-item_description_good Хорошо
//                 li.diagram__list-item.diagram__list-item_description_notBad Удовлетворительно
//                 li.diagram__list-item.diagram__list-item_description_bad Разочарован


export default Impressions;