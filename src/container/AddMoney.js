import react from "react";
import { withRouter } from 'react-router-dom'

import axios from "axios";
class AddMoney extends react.Component {
  constructor() {
    super();
    this.state = { value:null,transection:[] };
  }
  componentWillMount = () => {
    this.callWallets();
  };
  callWallets = () => {
    var self = this;
    axios
      .get("http://localhost:3000/models/transectionby/"+this.props.match.params.id)
      .then(function (response) {
        // handle success
        self.setState({ transection: response.data });
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        alert(error);
        console.log(error);
      });
  };
  handleChange=(event)=> {
    this.setState({value: event.target.value});
  }

  handleSubmit=()=> {
    alert('A name was submitted: ' + this.state.value);
    var self = this;
    console.log(this.props);
    var Transection = new Object();
    Transection['type'] = "Add";
    Transection['accoutId'] = this.props.match.params.id;
    Transection['dateBy'] = Date.now();
    Transection['price'] =
      this.state['value'] == null||this.state.value == "" ? 0 :parseInt(this.state.value);
      axios
        .put("http://localhost:3000/models/transection/" + this.props.match.params.id,Transection)
        .then(function (response) {
          self.callWallets();
          self.setState({ value: "" });
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          alert(error);
          console.log(error);
          self.setState({ name: ""});
        });
 }

  render() {
    return (
      <div >
        <label>
          Name:
          <input type="number" value={this.state.value} onChange={this.handleChange} />
        </label>
        <button onClick={() => this.handleSubmit()}>save</button>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>edit</th>
              <th>Add</th>

            </tr>
          </thead>
          <tbody>
            {this.state.transection.map((wallet) => (
              <tr key={wallet.id}>
                <td>{wallet.id}</td>
                <td>{wallet.name}</td>
                <td>
                  {" "}
                  {this.state.isEdit==false||wallet.id!=this.state.id?
                  <button onClick={() => this.edit(wallet)}>edit</button>:<div></div>}{" "}
                </td>
                <td>
                        <button
                          type='button'
                          onClick={() => {this.props.history.push('/AddMoney/'+wallet.id) }}
                        >
                          add money
                        </button>
                        </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default AddMoney;
