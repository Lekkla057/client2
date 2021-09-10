import react from "react";
import { withRouter } from 'react-router-dom'

import axios from "axios";
class Wallet extends react.Component {
  constructor() {
    super();
    this.state = { wallets: [], name: null, id: null, isEdit: false };
  }
  componentWillMount = () => {
    this.callWallets();
  };
  edit = (wallet) => {
    this.setState({ name: wallet.name, id: wallet.id, isEdit: true });
  };
  callWallets = () => {
    var self = this;
    axios
      .get("http://localhost:3000/models")
      .then(function (response) {
        // handle success
        self.setState({ wallets: response.data });
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        alert(error);
        console.log(error);
      });
  };
  handleChange = (event) => {
    console.log(event.target.value);
    console.log(this.state);

    this.setState({ name: event.target.value });
  };

  handleSubmit = () => {
    var self = this;
    var obj = new Object();
    obj["name"] = this.state.name;
    if (this.state.isEdit) {
      axios
        .put("http://localhost:3000/models/" + this.state.id,obj)
        .then(function (response) {
          self.callWallets();
          self.setState({ id: null, name: "", isEdit: false });
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          alert(error);
          console.log(error);
          self.setState({ id: null, name: "", isEdit: false });
        });
    } else {
      axios
        .post("http://localhost:3000/models",obj)
        .then(function (response) {
          self.callWallets();
          console.log(response);
          self.setState({ id: null, name: "", isEdit: false });
        })
        .catch(function (error) {
          // handle error
          alert(error);
          console.log(error);
          self.setState({ id: null, name: "", isEdit: false });
        });
    }
  };
  render() {
    let { wallets } = this.state;
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
        />

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
            {wallets.map((wallet) => (
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
export default Wallet;

