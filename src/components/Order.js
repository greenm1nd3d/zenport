import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

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
      errors: {},
      step: 1,
      showNotification: false,
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
  }

  componentDidUpdate() {
    if (this.state.showNotification) {
      window.setTimeout(() => {
        this.setState({
          showNotification: false
        });
      }, 1000);
    }
  }

  handlePrev(e) {
    e.preventDefault();

    switch (this.state.step) {
      case 3:
        this.setState({
          data: {
            meal: this.state.data.meal,
            people: this.state.data.people,
            resto: this.state.data.resto,
            dishes: this.state.data.dishes,
            servings: this.state.data.servings
          },
          step: 2
        });
        break;

      case 4:
        this.setState({
          data: {
            meal: this.state.data.meal,
            people: this.state.data.people,
            resto: this.state.data.resto,
            dishes: this.state.data.dishes,
            servings: this.state.data.servings
          },
          step: 3
        });
        break;

      default:
        this.setState({
          data: {
            meal: this.state.data.meal,
            people: this.state.data.people,
            resto: this.state.data.resto,
            dishes: this.state.data.dishes,
            servings: this.state.data.servings
          },
          step: 1
        });
    }
  }

  handleNext(e) {
    e.preventDefault();

    switch (this.state.step) {
      case 2:
        if (this.validateResto()) {
          this.setState({
            data: {
              meal: this.state.data.meal,
              people: this.state.data.people,
              resto: this.state.data.resto,
              dishes: this.state.data.dishes,
              dishname: this.state.data.dishname,
              servings: this.state.data.servings
            },
            step: 3,
            errors: {}
          })
        }
        break;

      case 3:
        if (this.validateDish()) {
          this.setState({
            data: {
              meal: this.state.data.meal,
              people: this.state.data.people,
              resto: this.state.data.resto,
              dishes: this.state.data.dishes,
              servings: this.state.data.servings
            },
            step: 4,
            errors: {}
          })
        }
        break;

      default:
        if (this.validateMeal()) {
          this.setState({
            data: {
              meal: this.state.data.meal,
              people: this.state.data.people,
              resto: this.state.data.resto,
              dishes: this.state.data.dishes,
              servings: this.state.data.servings
            },
            step: 2,
            errors: {}
          })
        }
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this.state.data)
    this.setState({
      formSubmitted: true
    })
    alert('Form successfully submitted. Please check console for submitted data.');
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
    var dishes = this.state.data.dishes;
    var arr = this.state.data.dishes.slice();
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
      },
      showNotification: true,
      errors: {}
    });
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
    let errors = {};
    let formIsValid = true;

    if (!data["meal"]) {
      formIsValid = false;
      errors["meal"] = "Error: Meal type is required";
    }

    if (!data["people"]) {
      formIsValid = false;
      errors["people"] = "Error: Number of people is required";
    }

    this.setState({
      errors: errors
    });

    return formIsValid;
  }

  validateResto() {
    let data = this.state.data;
    let errors = {};
    let formIsValid = true;

    if (!data["resto"]) {
      formIsValid = false;
      errors["resto"] = "Error: Restaurant is required";
    }

    this.setState({
      errors: errors
    });

    return formIsValid;
  }

  validateDish() {
    let data = this.state.data;
    let errors = {};
    let formIsValid = true;

    if (data["dishes"].length < 1) {
      formIsValid = false;
      errors["dishes"] = "Error: At least one dish is required";
    }

    this.setState({
      errors: errors
    });

    return formIsValid;
  }

  render() {
    const showNotification = this.state.showNotification ? {display: 'block'} : {display: 'none'};
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
              <div className="error-msg">{this.state.errors.resto}</div>
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
              <select name="servings" onChange={this.selectServings} value={this.state.data.servings}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="col-md-4"></div>
          </div>
          <div className="row pt-50">
            <div className="col-md-12">
              <FontAwesomeIcon icon={faPlusCircle} className="add-dish" onClick={this.addDish} />
              <div className="error-msg">{this.state.errors.dishes}</div>
              <p className="notification mt-15" style={showNotification}>Dish successfully added!</p>
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
              <div className="error-msg">{this.state.errors.meal}</div>
            </div>
          </div>
          <div className="row pl-180 pt-30">
            <div className="col-md-12">
              <label htmlFor="people">Please enter number of people</label>
              <select name="people" onChange={this.selectPeople} value={this.state.data.people}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <div className="error-msg">{this.state.errors.people}</div>
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
        </div>
      </div>
    );
  }
}

export default Order