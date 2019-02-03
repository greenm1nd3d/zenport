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
        dish: '',
        servings: 1,
        dishes: []
      },
      errors: {},
      showMeal: true,
      showResto: false,
      showDishes: false,
      showReview: false,
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

    if (this.state.showResto) {
      this.setState({
        data: {
          meal: this.state.data.meal,
          people: this.state.data.people,
          resto: this.state.data.resto,
          dishes: this.state.data.dishes,
          servings: this.state.data.servings
        },
        showMeal: true,
        showResto: false
      })
    }

    if (this.state.showDishes) {
      this.setState({
        data: {
          meal: this.state.data.meal,
          people: this.state.data.people,
          resto: this.state.data.resto,
          dishes: this.state.data.dishes,
          servings: this.state.data.servings
        },
        showResto: true,
        showDishes: false
      })
    }

    if (this.state.showReview) {
      this.setState({
        data: {
          meal: this.state.data.meal,
          people: this.state.data.people,
          resto: this.state.data.resto,
          dishes: this.state.data.dishes,
          servings: this.state.data.servings
        },
        showDishes: true,
        showReview: false
      })
    }
  }

  handleNext(e) {
    e.preventDefault();

    if (this.state.showMeal) {
      if (this.validateMeal()) {
        this.setState({
          data: {
            meal: this.state.data.meal,
            people: this.state.data.people,
            resto: this.state.data.resto,
            dishes: this.state.data.dishes,
            servings: this.state.data.servings
          },
          showMeal: false,
          showResto: true,
          errors: {}
        })
      }
    }

    if (this.state.showResto) {
      if (this.validateResto()) {
        this.setState({
          data: {
            meal: this.state.data.meal,
            people: this.state.data.people,
            resto: this.state.data.resto,
            dishes: this.state.data.dishes,
            servings: this.state.data.servings
          },
          showResto: false,
          showDishes: true,
          errors: {}
        })
      }
    }

    if (this.state.showDishes) {
      if (this.validateDish()) {
        this.setState({
          data: {
            meal: this.state.data.meal,
            people: this.state.data.people,
            resto: this.state.data.resto,
            dishes: this.state.data.dishes,
            servings: this.state.data.servings
          },
          showDishes: false,
          showReview: true,
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
        servings: this.state.data.servings
      },
    });
  }

  addDish() {
    var arr = this.state.data.dishes.slice();
    arr.push({
      name: this.state.data.dish,
      servings: this.state.data.servings
    })

    this.setState({
      data: {
        meal: this.state.data.meal,
        people: this.state.data.people,
        resto: this.state.data.resto,
        dishes: arr,
        dish: '',
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
        dish: e.target.value,
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
        dish: this.state.data.dish,
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
    const showMeal = this.state.showMeal ? {display: 'block'} : {display: 'none'};
    const showResto = this.state.showResto ? {display: 'block'} : {display: 'none'};
    const showDishes = this.state.showDishes ? {display: 'block'} : {display: 'none'};
    const showReview = this.state.showReview ? {display: 'block'} : {display: 'none'};
    const showNotification = this.state.showNotification ? {display: 'block'} : {display: 'none'};
    const formSubmitted = this.state.formSubmitted ? true : false;
    const dishes = this.state.data.dishes;

    return (
      <div className="App">
        <div className="container">
          <ul className="tabs pt-100">
            <li className={this.state.showMeal ? 'active': ''}>Step 1</li>
            <li className={this.state.showResto ? 'active': ''}>Step 2</li>
            <li className={this.state.showDishes ? 'active': ''}>Step 3</li>
            <li className={this.state.showReview ? 'active': ''}>Review</li>
          </ul>
          <div className="form pt-100">
            <div className="step1" style={showMeal}>
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
            <div className="step2" style={showResto}>
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
            <div className="step3" style={showDishes}>
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="dish">Please select a dish</label>
                  <select name="dish" onChange={this.selectDish} value={this.state.data.dish}>
                    <option value="">---</option>
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
            <div className="step4" style={showReview}>
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
                      <p key={dish.name}>{dish.name}&nbsp;&nbsp;&nbsp;&ndash;&nbsp;&nbsp;&nbsp;{dish.servings}</p>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Order