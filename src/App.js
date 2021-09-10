import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      dogImageObj: undefined,
      savedDogsImages: [],
    };

    this.fetchDogImages = this.fetchDogImages.bind(this);
    this.renderImageElement = this.renderImageElement.bind(this);
    this.saveImage = this.saveImage.bind(this);
  }

  componentDidMount() {
    this.fetchDogImages();
  }

  async fetchDogImages() {
    this.setState(
      { loading: true },
      async () => {
        const requestReturn = await fetch('https://dog.ceo/api/breeds/image/random');
        const requestObject = await requestReturn.json();
        this.setState({
          loading: false,
          dogImageObj: requestObject,
        });
      },
    );
  }

  saveImage() {
    this.setState(({ savedDogsImages, dogImageObj }) => ({
      savedDogsImages: [...savedDogsImages, dogImageObj],
    }));

    this.fetchDogImages();
  }

  renderImageElement() {
    const { dogImageObj: { message } } = this.state;
    return (
      <div>
        <img src={ message } alt="doguinho" />
        <button type="button" onClick={ this.saveImage }>
          Salvar imagem!
        </button>
      </div>
    );
  }

  render() {
    const { savedDogsImages, loading } = this.state;
    const loadingElement = <span>Loading...</span>;

    return (
      <div>
        <span>
          {savedDogsImages.map(({ message }, index) => (
            <img key={ index } src={ message } alt="Imagem de um Dog" />
          ))}
        </span>

        <p>{loading ? loadingElement : this.renderImageElement() }</p>

      </div>
    );
  }
}

export default App;
