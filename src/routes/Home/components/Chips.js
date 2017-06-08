import React from 'react'
import update from 'react-addons-update'
class Chips extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      chips: [],
      KEY: {
        backspace: 8,
        tab: 9,
        enter: 13,
        space: 32,
      },
      // only allow letters, numbers and spaces inbetween words
      INVALID_CHARS: /[^a-zA-Z0-9\s]/g,
    }
  }

  componentDidMount () {
    this.setChips(this.props.chips)
    this.refs.filter.focus()
  }

  componentWillReceiveProps (nextProps) {
    this.setChips(nextProps.chips)
  }

  onKeyDown (event) {
    const keyPressed = event.which
    if (keyPressed === this.state.KEY.enter ||
      keyPressed === this.state.KEY.space ||
      (keyPressed === this.state.KEY.tab && event.target.value)) {
      event.preventDefault()
      this.updateChips(event)
    } else if (keyPressed === this.state.KEY.backspace) {
      const chips = this.state.chips

      if (!event.target.value && chips.length) {
        this.deleteChip(chips[chips.length - 1])
      }
    }
  }

  setChips (chips) {
    if (chips && chips.length) this.setState({ chips })
    else { this.setState({ chips: [] }) }
  }

  clearInvalidChars (event) {
    const value = event.target.value
    if (this.state.INVALID_CHARS.test(value)) {
      event.target.value = value.replace(this.state.INVALID_CHARS, '')
    } else if (value.length > this.props.maxlength) {
      event.target.value = value.substr(0, this.props.maxlength)
    }
  }

  updateChips (event) {
    if (!this.props.max ||
      this.state.chips.length < this.props.max) {
      const value = event.target.value

      if (!value) return

      const chip = value.trim().toLowerCase()

      if (chip && this.state.chips.indexOf(chip) < 0) {
        this.setState({
          chips: update(
            this.state.chips,
            {
              $push: [chip],
            }
          ),
        })
      }
    }
    setTimeout(() => { this.props.onSearch(this.state.chips) }, 0)

    event.target.value = ''
  }

  deleteChip (e) {
    const index = this.state.chips.indexOf(e.target.dataset.chip)

    if (index >= 0) {
      this.setState({
        chips: update(
          this.state.chips,
          { $splice: [[index, 1]] }
        ),
      })
      setTimeout(() => { this.props.onSearch(this.state.chips) }, 0)
    }
  }

  focusInput (event) {
    const children = event.target.children
    if (children.length) children[children.length - 1].focus()
  }

  render () {
    const chips = this.state.chips.map((chip, index) => {
      return (
        <span className='chip' key={index}>
          <span className='chip-value'>{chip}</span>
          <button
            type='button'
            className='chip-delete-button'
            data-chip={chip}
            onClick={(e) => { this.deleteChip(e) }}
          >
            x
          </button>
        </span>
      )
    })

    const placeholder = !this.props.max ||
    chips.length < this.props.max ? this.props.placeholder : ''

    return (
      <div className='chips' onClick={this.focusInput}>
        {chips}
        <input
          type='text'
          className='chips-input'
          placeholder={placeholder}
          onKeyDown={(e) => { this.onKeyDown(e) }}
          onKeyUp={(e) => { this.clearInvalidChars(e) }}
          ref='filter'
        />
      </div>
    )
  }
}

export default Chips
