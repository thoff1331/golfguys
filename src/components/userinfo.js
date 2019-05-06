import React, { Component } from "react";
import { ALPN_ENABLED } from "constants";
import axios from "axios";
const pencil =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX////z8/NlZWX09PT+/v79/f319fX29vb8/Pz7+/v4+Pj6+vr5+fn39/dcXFxYWFjMzMzDw8NfX1+CgoJ9fX2NjY3U1NRUVFR4eHhpaWnn5+e4uLiHh4fd3d2lpaVoaGiXl5eurq6UlJS9vb1xcXGfn5/j4+OcKek3AAAPm0lEQVR4nN1d62KqOBAGC3JHpa1Wre3pOd2+/yOukPuVBJKA5cdu9UzIfGSG+ZIZkygCV5IIf0SqP/zLur3dcOUF+JjkOf4D/Eta4D9SlawgIpONFLJIxEbWRk1wVSX4Oqlr8HVaV1CuLMAfRZlPkK1HZdHtIiSCZXMkO61rdN/hKjPwddJk4Os0a8AtiqyG/WeVIAt7ycqIly2QLNQI3S5HshW5HZQVupbJCl2Lahac7HDX8gl8nWyfQC/50xa0rOIGNojhLbIn2PLpCSoSZ/DmSLaJoUZbKJsi2YLIlqws7jpFXReSrieoOdhsBXHflR5vGfOy8TZiZQnA2AagSrZEsmLXT3zXopqD8ebQcsljjJ0CTIjSWyVA5cMQAW5J12o1YddZmaBx7BWJBYAZ13JLACITxUpPGMGMAOS6LoSuybMlspECIHm2w+1g1KBHxX4EJwGUmKgIUGmi42rirrmWBsb9ID6IZGEv4ybq2AclJmrgg6KaSh9kAaqVXpcPmqjJPVvYy5wwMcsHNTFTa6LGaqb9/5LGTxxMTHzQIkwYAeRMNK3SnuRlXnxwrokKACf4YN4MEb8eff869kEdVTN5tmNq4q7zbf8vCZyH/MIwkQMRGPEfhKpZmSjqGrVUPZpVhAkbqsariT79EqpGyWY0wAV8MJ4AcIqaCdPL76FqWM0h4qdZqDARjKphEy2qfoJYN79lRi+q2fQd5ZX92IejajYzevFduO17TNDqm85OOBP1R9U0YULtSaowgbtWPhpfVM1pmBCpmrD4Nw7wQX2QA+g5TFCygcIED9DGuEP74KQwgdVMQC+/jqphNfP+H/IsPFVz5IOjJlr1oTAta78Aw83oBUMrh4hfFFzLlc3oIwVAoWtJjmjb3w5F/N8TJsRxmA9wyeSLgZpsy1XMJubM6C1GcM1UTUi+aPK0SoCP6YOimgnQ6NdRNdz1kB3Faf5V+OCcGb2o5lCrkZbVWC/rTr5oADZDyQkqtVkZVXOy8LAdMk+pF4CzqFrU1FzXNlRNUBN9Wg1VSy+H6+EYSwEazOgVANcTJvLr227X3q/3fbp1MaubDtAPVbt9t91muLr2JRYA2i/+CQAXpmr73YZc3ebCyE5ZeODq2haf0TMA79fnRc8oR30w6bPcUZXZj70fH9y3mw0PMZ9FuNi6tsWTLyLA+/WDo9mEcdiydW1LUzXeRGlfNJrRi2oOdaiSurbRR+OFqkkB3q/zRZS1GwdrgH6SL1ITBddlmolOBugpTKgB3n2xmbE+Pb2l0zBxPGkAdpsftmsjH/QwgnNm9NWrbgy7wRcnqcnVtS03o0/idx3EzSae9qpAdW2Lr6r11UvaUby/bsoJJorq2layqjYC8RZZAyzYurbFky+p3hc/L/Zq0nVtC8zoBdl6xBcvEw2NBRh6Rn+hnu2T/o3aQ7QxUTnA0GHiejrWdNd6iOcbWiT0ANDPjP7abto93fWIL0IabsMoh4/pUmHi2pPt3ZFRetRQ7dTMQV3bBON2ESauYDbRQ8QA60wP8f5GtVET1rWh3/mF9kE0XeqOEVk2rJIRX/zJzNUEdW1FNQbQD1W7EiDtPkWyd3PWQ+w2sbmaTF1b8Bk9DeN0ZGT1EJ/N1YRdTwfobkbfHumH0WhD//D2tVFzuEJTNWHCe/dF6ieu2tDfvYcCOC35olqyaPc1vbKtg9jGdeARtKZq0kWn0x51PchqILb7zFzNBHwdeOGXAtgxhkrJpmpfbK+JsZpsXVsgqkab6O4/6kMPkfxIOVaOYvvPWE22rm2B5MvuEB1ovMeCKK021N3eVM2yGbLchT1AR8mX9nD/goEIfRF2rYDYXkzV3PYiKMu9QPJldxj+5UAwd8AX0exfwW5eElM14eDJAfpPvpwAwCj5Rw/rkVrekK/ADW5ooaYCoP/kS3tAsoyh3gkcWfiVrsB9p1Zq2gN0RNUIwJox1Hu0q+ilIwFi+2Onphyg6+SL6IMnGuAdIhUX2yMFUJj19y8jG4AJ+DpInYzkJUPM+Y2HSFZWGF9szQBiNWFdm2OqZmmiPZwXCuAw6ycLvwwNNwSI1Rwq2lK0AVHwMIEBVs+cs3X7mlo6IkHD0kTB7i24rs1uRj+HqnE+GKU8wI1iBY4GaMQombq2oFSNkc3fJEEPrMDVzAqcrQ8iNY0BuqRqFMDqRUpc+tcNBlhvX1trH0RqTgA4K0zofLB7YydTZFZXJK8nJwA1cXBG8kXrg9QIds9c6Kcpc3ULZ6JuqBoESPlg955GPIGju7YDiKgtrGsLNaMXfJA20fehGU3Dh5nGvEkPX9fmeUbPm2hBAxzmRPlTfmAhzmOUoK6tRuzEd52MECYYHxwA9s+WNtR2X89hlExdW/gwUdAA3/MI5+jZhQ1jgBJGSde1LUvVumcAEHrHgffFeYwSaeQh+WJK1aAP4tlE9B8VF0+XmQsPY4/G0YwerTHJwwQAiFJiNRMVrzMZ5VhLHzP6iKVqIEwQgCXjh2YA1a+KBGoUdkbPhonnYVkam2hNz/etAcYcQFDXlvme0fMA2TDBAqwmjKBazZzZvcVb8kWY0fNUzZkPCoySqWvzRtW0YQL6IDFROtz/m7vwwNS1+aNq3Fs014SJil/it8sRCYYG6toixaMJS9UGgKyJTpzRi2oqWgahamyYYE3UesIrH0EbgJ6pGhcmJs7oxXGAnzwnX0yo2hQfNDDR4WPuyActZ/Q8VaPK9d35IF/X5pmqScKEIx8UTBT6IFvXth6qZguQp2pElqlrc10nYxMmqgkjaKIms3uL/+SLYkY/MQ7aMEplS39hQkPVpocJUc0RgE5X1QJQNUOAAZIvgaiauYn6pmqlnzCBAQ7fVyGTL2GoGgZYgLq2kMmXMGECAaxBXVtl33JO8sUZVRvPETXSujbvyRd/YULYRkNa1+Z4Ri9Jvoz7oN3i36ihoU+/ZUavABg6+RKAqo0C9E/V/IYJOcCAyRdHM/pxNUGW2xFVs0q+eJnRi2rCU8mWTb64pGq8mnD3Fmx2/nwwyIxeHEFY15aili6pmnHyxaeJsqeSuU2+6KnanDhoXc4Dr6WSLx5m9CqAq0q+aHzQ1tAIwN9G1ZQmOoWqdTzZ1lI1L8kXNUAQ8ZtZVK37ALdfw4xeAAjq2sipZFOoWn+dv9//u0JFFki+qPcUSZlTyWZtO9Z1MCCugqrhTVNAlhsefWxuopF0TyfwE2td8iUYVeM2p1XWtSlbXuQbq3U/iyRfNCOINpMGLS12iD1ihB39O5DuY5Hki/olEzMAbSLoF1b1+e3c7doOAY1XMKMX98tS9KIx7uovBNReoyS+3A4ff77BF2cypKGTL2oTTUwBEsabviBFwd5UecmUvAKAgZMvir21+kagrs1mM/8sPSNVyQ6x/M+WlqZquGtFXZt227HoglQ9p7iXD+anZ6GTL+oRLMCpZHxd28i2Yzek7gvphQkgi1M1cuYA3L3FkKohO0ED0v2henmmXzKGYWLuD3RGwwTOqRk/GtDyg7xKSYqHQvECZJejasK2XnxLjYkOvbwihMeCbLfy9E1g/L2/Y598hYlxqiYcizEGkD/zJUe/L9v9bKntVqh3Tdc+HyoMMDRVGx1BdZiAvcRI3xPz8+FLS/+wrv0+9MrdfTBwmBCPpgHDYhQmQC/5Del8jhDAQfbysaGj4um6KFXDAPlTycaNu8Gv0ldWNqou1zPFS7+c+eCUMMGcSobr2ozOfMm/0IvmC8riV/+9h8P3Du37/xG5oWoGCw/qEWTr2nQ7xFIt/yCEw5xeUPoI5xf3aLkYVSObQnGnko364NAS8+4fqWyTHz+BEe+Dz+h5gCinNtqSMe4cvTLbkjFR0ksBQuOZ4As7oxcPNlEBlJ+7FOPNDm9ygFH0tuGuQGGCVlMC0NS4j9j22mPJKQ2jzstcgBOSL5rjoeAnYw70jwoIN3kv78xUKuyMXgSYgK/HqBppSe8+NmxALT7G104F0HGdjO4tytS14VPJZD7ItWT2kdm0N6I0Wfn5w4gsQtWUdW3aMDG0rFgLbG8164P3P3L6J67LUDW+ri1XtRSN+ynmV2TgT60RwPxy/HLig07CRCY/lUx3PF9+4xHCgxmqNLocr3/ezl07XqvmpE7GwERRNFM9GmlLYd1ws7uVt8PH+/m0a8nacDgf1LxktqMAZRGUXVQDw9j22ISvl6NqispExZIF3/JVBkV+LUzVVCY6dkTm9ziygCZqcpLnIKk+lYxvGX86BugrTOD3G6xrMx77H+FF48pE3VI1vq4t5x6jeuxVp05RV9e17e4UMvmiMdGMPZVs/CTl6kv3oumxbT7f/lyPfcomfJgQTVR5Kpny0eDUIY+t3e0+314/DrcfuCW89zoZLcCC7ZprqX3/PstMcvPy9+twGYYBpEKsAXoJE2NlX7KWafnNYute/vt3jNMKerLVnk6+ZhMKgIbGPSxh3KF15+/Xr8PxwskG2sjWyAc5E92OMBnUy/HUfr/8vb9Jem9rSqS04/3OJyRfNKM9zC4aE4C9IpdjjNPHro+HmuODjdJE0alkxhwoQin/Bc8k1/ig4P7CqWQqgFNOUl6QqhE12VPJLIzb+fFQjsKEoCZ9KpkJTbcA6DH5Yq+mQmmNcS/ngwYz+kTwpPFHI69pdBcmJtTJqNUUXxXgkwUHWqsPqtRMmF68A/Q+oxfUHCJ+mlm8f2eZqK/ki1rNgqlrswkT/qiamzCB6pVAXVvlKUyESr6o1WRPJVt3mLCiakIIVrZ8EKo2qqai5eNSNcMRdEzVpiVfxtfGND44MoJqDrRKqqYx0QT0sgaqNiP5IgMIb8fXtfmman6SLxoTZU8ls2m5MqqmimbsqWS+woRI1XzN6EU1we4tOdcyIFXzHCawmnxLzzN6uxG0Z5TiOLAt10TVHC08yHsJQNWcJl80alr3sg6qpjZR3gcT8HUwqmbxI2U3PsjWta2bqk1aeGBPJXswqiZTkzfRphyGENe1rZmqmczoRTW5urZVUTUO4MRoRuVIH2dGb7/4N9bLw1I1HuCqki9qgPaeJLRcIVUzSL6o1VTWtT1W8kWiJuw64U8l+y1UDavJ1rU9avJFY2jyU8keLfmiU1NV1zYDYMAwoaRqiqIh1wCDJV/G1QQtcZ3MFi3DbdEvS1ExHljW6bXPBFm0Wrct0O2giSLZAsnWSLaRyEZQFlVbCV1nYteimlzXoGVZgk9pA/svGtigauDMoy7TcdkcicBekGxOZNHtiCx3u1zsujHuOip5NcGnAu0VVcF7phVskKM/igq2rHjZnMhCkQJmJDWy+Hao68Sg60lqpuS/1B9Jmgh/cCI2sjKRxOJ2NrKCmsn/czIEfZD08bQAAAAASUVORK5CYII=";

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      course: "",
      handicap: "",
      rounds: "",
      career: "",
      showInput: false,
      profileValues: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // }
    // // componentDidMount() {
    // //   axios;
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("hittem");
    axios
      .post("/auth/profileSetup/${user_id}", {
        course: this.state.course,
        handicap: this.state.handicap,
        rounds: this.state.rounds,
        career: this.state.career
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          profileValues: res.data
        });
      });
  }
  render() {
    let mappedProfile = this.state.profileValues.map((val, index) => {
      return (
        <div>
          <h1>Home Course: {val.course}</h1>
          <h1>Handicap: {val.handicap}</h1>
          <h1> Rounds Per Year: {val.rounds}</h1>
          <h1> Career Hole in One: {val.career}</h1>
        </div>
      );
    });
    return (
      <div className="users">
        {mappedProfile}
        <button onClick={() => this.setState({ showInput: true })}>Edit</button>
        {/* <h4>Home Course:</h4> */}
        {this.state.showInput ? (
          <form
            onSubmit={this.handlesubmit}
            autoComplete="off"
            className="profile-form"
          >
            <label>HomeCourse</label>
            <input
              onChange={this.handleChange}
              placeholder="course"
              name="course"
              value={this.state.course}
              autoComplete="off"
            />
            <label> Handicap</label>
            <input
              onChange={this.handleChange}
              name="handicap"
              value={this.state.handicap}
              type="number"
              autoComplete="off"
            />
            <label>Rounds Per Year</label>
            <input
              value={this.state.rounds}
              onChange={this.handleChange}
              name="rounds"
              type="number"
              autoComplete="off"
            />
            <label>Career Hole in One</label>
            <input
              onChange={this.handleChange}
              value={this.state.career}
              name="career"
              type="number"
              autoComplete="off"
            />
            <button onClick={this.handleSubmit}>submit</button>
          </form>
        ) : null}
        {this.state.showInput ? (
          <button
            className="profile-change-button"
            onClick={() => this.setState({ showInput: false })}
          >
            Submit
          </button>
        ) : null}

        {/* <h4> Rounds Per Year: 52</h4>

        <h4>Career Hole in One: 4</h4> */}
      </div>
    );
  }
}

export default UserInfo;
