import React, { Component } from 'react';
import './Card.scss';

//CLASS COMPONENT
// this.props is DATA WHICH COMES FROM PARENT COMPONENT (APP JS)  : PLEASE CONSOLE LOG (this.props) 
class Card extends Component {
    render() { // # === TODO # render()
        return (
            <div>
                <div className='main_card'>
                    <div className='card_left'>
                        <div className='card_datails'>
                            <h2>{this.props.movieName || ''}</h2>
                            <div className='card_cat'>
                                <p className='PG'>{this.props.duration}</p>
                                <p className='year'>{this.props.year}</p>
                                <p className='genre'>{this.props.genres ? this.props.genres.join(" | ") : null} </p>
                                <p className='time'>{this.props.contentRating}</p>
                            </div>
                            <p className='disc'>{
                                ((this.props.description).length > 180) ?
                                    (((this.props.description).substring(0, 180)) + '...') :
                                    this.props.description
                            }</p>
                            <div>
                                <p className='actors'>{this.props.actors ? this.props.actors.join(" | ") : null} </p>
                            </div>

                            <div className='social-btn'>
                                <button onClick={() => this.props.editDialog(this.props.id)} >
                                    EDIT
                                </button>
                                <button onClick={() => { this.props.deleteMovie(this.props.id) }}>
                                    DELETE
                                </button>
                                <button>
                                    IMB Rating : {this.props.imdbRating ? this.props.imdbRating : 0}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='card_right'>
                        <div className='img_container'>
                            <img src={this.props.movieImage} alt='' />
                        </div>
                    </div>
                </div>
               
            </div>
        );
    }
}

export default Card;

