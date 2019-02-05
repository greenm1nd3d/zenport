import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class Order extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      data: {
        meal: '',
        people: 1,
        resto: '',
        dishname: '',
        servings: 1,
        dishes: []
      },
      step: 1,
      formSubmitted: false
    }

    this.addDish = this.addDish.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectMeal = this.selectMeal.bind(this);
    this.selectPeople = this.selectPeople.bind(this);
    this.selectResto = this.selectResto.bind(this);
    this.selectDish = this.selectDish.bind(this);
    this.selectServings = this.selectServings.bind(this);

    this.showNotification = this.showNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  showNotification(title, message, msgtype) {
    this.notificationDOMRef.current.addNotification({
      title: title,
      message: message,
      type: msgtype,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  getTotalServings() {
    var total = 0;
    this.state.data.dishes.map(s =>
      total += parseInt(s.servings)
    );
    return total;
  }

  passStates(step) {
    this.setState({
      data: {
        meal: this.state.data.meal,
        people: this.state.data.people,
        resto: this.state.data.resto,
        dishes: this.state.data.dishes,
        dishname: this.state.data.dishname,
        servings: this.state.data.servings
      },
      step: step
    });
  }

  handlePrev(e) {
    e.preventDefault();

    switch (this.state.step) {
      case 3:
        this.passStates(2);
        break;

      case 4:
        this.passStates(3);
        break;

      default:
        this.passStates(1);
    }
  }

  handleNext(e) {
    e.preventDefault();

    switch (this.state.step) {
      case 2:
        if (this.validateResto()) {
          this.passStates(3);
        }
        break;

      case 3:
        if (this.validateDish()) {
          this.passStates(4);
        }
        break;

      default:
        if (this.validateMeal()) {
          this.passStates(2);
        }
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this.state.data)
    this.setState({
      formSubmitted: true
    })
    this.showNotification(
      'Success',
      'Form successfully submitted. Please check console for submitted data.',
      'success'
    );
  }

  selectMeal(e) {
    this.setState({
      data: {
        meal: e.target.value,
        people: this.state.data.people,
        resto: this.state.data.resto,
        dishes: this.state.data.dishes,
        servings: this.state.data.servings
      }
    });
  }

  selectPeople(e) {
    this.setState({
      data: {
        meal: this.state.data.meal,
        people: e.target.value,
        resto: this.state.data.resto,
        dishes: this.state.data.dishes,
        servings: this.state.data.servings
      },
    });
  }

  selectResto(e) {
    this.setState({
      data: {
        meal: this.state.data.meal,
        people: this.state.data.people,
        resto: e.target.value,
        dishes: this.state.data.dishes,
        dishname: '',
        servings: this.state.data.servings
      },
    });
  }

  addDish() {
    if (this.state.data.dishname === '') {
      this.showNotification(
        'Error',
        'You must select a dish',
        'danger'
      );
      return;
    }

    if (this.state.data.servings > 10) {
      this.showNotification(
        'Error',
        'Number of servings cannot be greater than 10',
        'danger'
      );
      return;
    }

    var dishes = this.state.data.dishes;
    var arr = this.state.data.dishes.slice();
    var x = 0;

    for (var i=0; i<dishes.length; i++) {
      if (arr[i].dishname === this.state.data.dishname) {
        x = arr[i].dish_id;
      }
    }

    if (x !== 0) {
      this.setState({
        data: {
          meal: this.state.data.meal,
          people: this.state.data.people,
          resto: this.state.data.resto,
          dishes: this.state.data.dishes.map(
            dish => (dish.dish_id === x ? Object.assign({}, dish, {servings: (parseInt(dish.servings) + parseInt(this.state.data.servings))}) : dish)
          ),
          dishname: '',
          servings: 1,
        }
      });

      this.showNotification(
        'Success',
        'Dish already on your list. Updating number of servings',
        'success'
      );

      return;
    }

    arr.push({
      dish_id: dishes.length + 1,
      dishname: this.state.data.dishname,
      servings: this.state.data.servings
    })

    this.setState({
      data: {
        meal: this.state.data.meal,
        people: this.state.data.people,
        resto: this.state.data.resto,
        dishes: arr,
        dishname: '',
        servings: 1
      }
    });

    this.showNotification(
      'Success',
      'Dish successfully added to order list!',
      'success'
    );
  }

  selectDish(e) {
    this.setState({
      data: {
        meal: this.state.data.meal,
        people: this.state.data.people,
        resto: this.state.data.resto,
        dishes: this.state.data.dishes,
        dishname: e.target.value,
        servings: this.state.data.servings
      }
    });
  }

  selectServings(e) {
    this.setState({
      data: {
        meal: this.state.data.meal,
        people: this.state.data.people,
        resto: this.state.data.resto,
        dishes: this.state.data.dishes,
        dishname: this.state.data.dishname,
        servings: e.target.value
      },
    });
  }

  validateMeal() {
    let data = this.state.data;
    let formIsValid = true;

    if (!data["meal"]) {
      formIsValid = false;
      this.showNotification(
        'Error',
        'Meal type is required',
        'danger'
      );
    }

    if (!data["people"]) {
      formIsValid = false;
      this.showNotification(
        'Error',
        'Number of people is required',
        'danger'
      );
    }

    return formIsValid;
  }

  validateResto() {
    let data = this.state.data;
    let formIsValid = true;

    if (!data["resto"]) {
      formIsValid = false;
      this.showNotification(
        'Error',
        'Restaurant is required',
        'danger'
      );
    }

    return formIsValid;
  }

  validateDish() {
    let data = this.state.data;
    let formIsValid = true;
    var servings = 0;
    const people = this.state.data.people;

    if (data["dishes"].length < 1) {
      this.showNotification(
        'Success',
        'At least one dish is required',
        'danger'
      );
      formIsValid = false;
    }

    servings = this.getTotalServings();

    if (servings < people) {
      this.showNotification(
        'Success',
        'Total servings must be greater than the number of people',
        'danger'
      );
      formIsValid = false;
    }

    return formIsValid;
  }

  render() {
    const formSubmitted = this.state.formSubmitted ? true : false;
    const dishes = this.state.data.dishes;
    var stepHTML = '';

    switch (this.state.step) {
      case 2:
        stepHTML = <div className="step2">
          <div className="row pl-180">
            <div className="col-md-12">
              <label htmlFor="resto">Please select a restaurant</label>
              <select name="resto" onChange={this.selectResto} value={this.state.data.resto}>
                <option value="">---</option>
                <option value="Butagumi">Butagumi</option>
                <option value="Kozue">Kozue</option>
                <option value="Narisawa">Narisawa</option>
              </select>
            </div>
          </div>
          <div className="row pt-100">
            <div className="col-md-4">
              <button className="btnContinue" onClick={this.handlePrev}><FontAwesomeIcon icon={faAngleDoubleLeft} /> Previous</button>
            </div>
            <div className="col-md-4 align-right">
              <button className="btnContinue" onClick={this.handleNext}>Next <FontAwesomeIcon icon={faAngleDoubleRight} /></button>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
        break;

      case 3:
        stepHTML = <div className="step3">
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="dishname">Please select a dish</label>
              <select name="dishname" onChange={this.selectDish} value={this.state.data.dishname}>
                <option>---</option>
                <option value="Dish A">Dish A</option>
                <option value="Dish B">Dish B</option>
                <option value="Dish C">Dish C</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="servings">Please enter number of servings</label>
              <input type="number" name="servings" min="1" max="10" onChange={this.selectServings} value={this.state.data.servings} />
            </div>
            <div className="col-md-4"></div>
          </div>
          <div className="row pt-50">
            <div className="col-md-12">
              <FontAwesomeIcon icon={faPlusCircle} className="add-dish" onClick={this.addDish} />
            </div>
          </div>
          <div className="row pt-100">
            <div className="col-md-4">
              <button className="btnContinue" onClick={this.handlePrev}><FontAwesomeIcon icon={faAngleDoubleLeft} /> Previous</button>
            </div>
            <div className="col-md-4 align-right">
              <button className="btnContinue" onClick={this.handleNext}>Next <FontAwesomeIcon icon={faAngleDoubleRight} /></button>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
        break;

      case 4:
        stepHTML = <div className="step4">
          <div className="row">
            <div className="col-md-3">Meal</div>
            <div className="col-md-9">{this.state.data.meal}</div>
          </div>
          <div className="row pt-30">
            <div className="col-md-3">People</div>
            <div className="col-md-9">{this.state.data.people}</div>
          </div>
          <div className="row pt-30">
            <div className="col-md-3">Restaurant</div>
            <div className="col-md-9">{this.state.data.resto}</div>
          </div>
          <div className="row pt-30">
            <div className="col-md-3">Dishes</div>
            <div className="col-md-9">
              <div className="dishes-box">
                {dishes.map(dish => (
                  <p key={dish.dish_id}>{dish.dishname}&nbsp;&nbsp;&nbsp;&ndash;&nbsp;&nbsp;&nbsp;{dish.servings}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="row pt-100">
            <div className="col-md-4">
              <button className="btnContinue" onClick={this.handlePrev}>Previous</button>
            </div>
            <div className="col-md-4">
              <button className="btnSubmit" onClick={this.handleSubmit} disabled={formSubmitted}>Submit</button>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
        break;

      default:
        stepHTML = <div className="step1">
          <div className="row pl-180">
            <div className="col-md-12">
              <label htmlFor="meal">Please select type of meal</label>
              <select name="meal" onChange={this.selectMeal} value={this.state.data.meal}>
                <option value="">---</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
          </div>
          <div className="row pl-180 pt-30">
            <div className="col-md-12">
              <label htmlFor="people">Please enter number of people</label>
              <input type="number" name="people" min="1" max="10" onChange={this.selectPeople} value={this.state.data.people} />
            </div>
          </div>
          <div className="row pt-100">
            <div className="col-md-4"></div>
            <div className="col-md-4 align-right">
              <button className="btnContinue" onClick={this.handleNext}>Next <FontAwesomeIcon icon={faAngleDoubleRight} /></button>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
    }

    return (
      <div className="App">
        <div className="container">
          <ul className="tabs pt-100">
            <li className={this.state.step === 1 ? 'active': ''}>Step 1</li>
            <li className={this.state.step === 2 ? 'active': ''}>Step 2</li>
            <li className={this.state.step === 3 ? 'active': ''}>Step 3</li>
            <li className={this.state.step === 4 ? 'active': ''}>Review</li>
          </ul>
          <div className="form pt-100">
            {stepHTML}
          </div>
          <ReactNotification ref={this.notificationDOMRef} />
        </div>
      </div>
    );
  }
}

export default Order