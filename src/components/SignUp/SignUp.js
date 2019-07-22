// import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import { withSnackbar } from 'notistack'
// import { signUp, signIn } from '../../api/auth'
// import messages from '../AutoDismissAlert/messages'

// class SignUp extends Component {
//   constructor () {
//     super()
//
//     this.state = {
//       email: '',
//       password: '',
//       passwordConfirmation: ''
//     }
//   }
//
//   handleChange = event => this.setState({
//     [event.target.name]: event.target.value
//   })
//
//   onSignUp = event => {
//     event.preventDefault()
//
//     const { enqueueSnackbar, history, setUser } = this.props
//

//   }
//
//   render () {
//     const { email, password, passwordConfirmation } = this.state
//
//     return (
//       <div className="row">
//         <div className="col-sm-10 col-md-8 mx-auto mt-5">
//           <h3>Sign Up</h3>
//           <Form onSubmit={this.onSignUp}>
//             <Form.Group controlId="email">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 required
//                 type="email"
//                 name="email"
//                 value={email}
//                 placeholder="Enter email"
//                 onChange={this.handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 required
//                 name="password"
//                 value={password}
//                 type="password"
//                 placeholder="Password"
//                 onChange={this.handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="passwordConfirmation">
//               <Form.Label>Password Confirmation</Form.Label>
//               <Form.Control
//                 required
//                 name="passwordConfirmation"
//                 value={passwordConfirmation}
//                 type="password"
//                 placeholder="Confirm Password"
//                 onChange={this.handleChange}
//               />
//             </Form.Group>
//             <Button
//               variant="primary"
//               type="submit"
//             >
//               Submit
//             </Button>
//           </Form>
//         </div>
//       </div>
//     )
//   }
// }

// export default withSnackbar(withRouter(SignUp))
