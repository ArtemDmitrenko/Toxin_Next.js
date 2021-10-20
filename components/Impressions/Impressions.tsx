import styles from './impressions.module.scss';

type ImpressionsProps = {
  amazing: number,
  good: number,
  satisfactorily: number,
  bad: number
};

const Impressions = (props: ImpressionsProps) => {
  const { amazing, good, satisfactorily, bad } = props;
  const lengthOfCircle: number = 364.424672;
  const sum: number = Object.values(props).reduce(
    (previousValue, currentValue) => previousValue + currentValue,
  );

  const calcLengthOfOneReview = (number: number): number => (lengthOfCircle * number) / sum;
  
  const goodInPixels = calcLengthOfOneReview(good);
  const amazingInPixels = calcLengthOfOneReview(amazing);
  const notbadInPixels = calcLengthOfOneReview(satisfactorily);
  const badInPixels = calcLengthOfOneReview(bad);


  // export default class Diagram {
  //   constructor(item) {
  //     this.item = item;
  //     this.init();
  //     this.getAttributes();
  //     this.calcSumOfReviews();
  //     this.calcLengthsOfAllReviews();
  //     this.drawElementsOfDiagram();
  //     this.printAllNumberOfReviews();
  //   }
  
  //   init() {
  //     this.lengthOfCircle = 364.424672;
  //     this.$svg = this.item.querySelector(".js-diagram__chart");
  //     this.wholeNumberOfReviews = this.item.querySelector(".js-diagram__total");
  //   }
  
  //   getAttributeInNumber(review) {
  //     return Number(this.item.dataset[review]);
  //   }
  
  //   getAttributes() {
  //     this.model = { good: 0, amazing: 0, notbad: 0, bad: 0 };
  //     for (let review in this.model) {
  //       this.model[review] = this.getAttributeInNumber(review);
  //     }
  //   }
  
  //   calcSumOfReviews() {
  //     this.sum = Object.values(this.model).reduce(
  //       (previousValue, currentValue) => previousValue + currentValue
  //     );
  //   }
  
  //   calcLengthOfOneReview(numberOfReview) {
  //     return (this.lengthOfCircle * numberOfReview) / this.sum;
  //   }
  
  //   calcLengthsOfAllReviews() {
  //     this.goodInPixels = this.calcLengthOfOneReview(this.model.good);
  //     this.amazingInPixels = this.calcLengthOfOneReview(this.model.amazing);
  //     this.notbadInPixels = this.calcLengthOfOneReview(this.model.notbad);
  //     this.badInPixels = this.calcLengthOfOneReview(this.model.bad);
  //   }
  
  //   drawElementsOfDiagram() {
  //     if (this.model.good) {
  //       this.$svg.insertAdjacentHTML(
  //         "beforeend",
  //         `
  //         <circle class='diagram__unit diagram__unit_good' r='58' cx='50%' cy="50%" stroke="url(#linear-gradient-green)" style="stroke-dasharray: ${
  //           this.goodInPixels - 2
  //         } ${this.lengthOfCircle}; stroke-dashoffset: -1">
  //         `
  //       );
  //     }
  //     if (this.model.amazing) {
  //       this.$svg.insertAdjacentHTML(
  //         "beforeend",
  //         `
  //         <circle class='diagram__unit diagram__unit_good' r='58' cx='50%' cy="50%" stroke="url(#linear-gradient-yellow)" style="stroke-dasharray: ${
  //           this.amazingInPixels - 2
  //         } ${this.lengthOfCircle}; stroke-dashoffset: ${-(
  //           this.goodInPixels + 1
  //         )}">
  //         `
  //       );
  //     }
  //     if (this.model.notbad) {
  //       this.$svg.insertAdjacentHTML(
  //         "beforeend",
  //         `
  //         <circle class='diagram__unit diagram__unit_good' r='58' cx='50%' cy="50%" stroke="url(#linear-gradient-purple)" style="stroke-dasharray: ${
  //           this.notbadInPixels - 2
  //         } ${this.lengthOfCircle}; stroke-dashoffset: ${-(
  //           this.amazingInPixels +
  //           this.goodInPixels +
  //           1
  //         )}">
  //         `
  //       );
  //     }
  //     if (this.model.bad) {
  //       this.$svg.insertAdjacentHTML(
  //         "beforeend",
  //         `
  //         <circle class='diagram__unit diagram__unit_good' r='58' cx='50%' cy="50%" stroke="url(#linear-gradient-black)" style="stroke-dasharray: ${
  //           this.badInPixels - 2
  //         } ${this.lengthOfCircle}; stroke-dashoffset: ${-(
  //           this.notbadInPixels +
  //           this.amazingInPixels +
  //           this.goodInPixels +
  //           1
  //         )}">
  //         `
  //       );
  //     }
  //   }
  
  //   printAllNumberOfReviews() {
  //     this.wholeNumberOfReviews.innerHTML = `${this.sum}<br><span>голосов</span>`;
  //   }
  // }




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
          <circle className={styles.unit} r="58" cx="50%" cy="50%" stroke="url(#linear-gradient-green)" strokeDasharray="89.106168 364.424672" strokeDashoffset="-1" />
          <circle className={styles.unit} r="58" cx="50%" cy="50%" stroke="url(#linear-gradient-yellow)" strokeDasharray="89.106168 364.424672" strokeDashoffset="-1" />
          <circle className={styles.unit} r="58" cx="50%" cy="50%" stroke="url(#linear-gradient-purple)" strokeDasharray="89.106168 364.424672" strokeDashoffset="-1" />
          <circle className={styles.unit} r="58" cx="50%" cy="50%" stroke="url(#linear-gradient-black)" strokeDasharray="89.106168 364.424672" strokeDashoffset="-1" />
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