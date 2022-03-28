/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Products from '../../components/products';
import { RootState } from '../../redux/store';
import { updateProductIntoTicket } from '../../redux/ticket/actionCreator';
import './ticketPage.scss';
import { TicketI } from '../../interfaces/ticket';

function TicketPage() {
    const { id } = useParams();
    const user = useSelector((state: RootState) => state.user);
    const ticketInfo = useSelector((state: RootState) => state.ticket);
    const ta: number = useSelector((state: RootState) =>
        state.ticket.findIndex((item: TicketI) => item._id === id)
    );
    console.log('ID', id);
    console.log(ticketInfo);

    const [actualTicket, setActualTicket] = useState<TicketI>();

    useEffect(() => {
        setActualTicket(ticketInfo.find((item: TicketI) => item._id === id));
    }, [ticketInfo]);

    const dispatch = useDispatch();

    const updateTicket = (idItem: number) =>
        dispatch(updateProductIntoTicket(id, idItem, user.token));
    return (
        <div className="container-grid">
            <div className="block1">
                <h3 key="item._id" className="ticket-title">
                    Ticket Mesa N. {ta + 1}
                </h3>

                <div className="block-ticket">
                    <div className="ticket-subtitle">
                        <p className="ticket-subtitle__elements ticket-subtitle__elements--items">
                            Uds:
                        </p>
                        <p className="ticket-subtitle__elements ticket-subtitle__elements--items">
                            Article:
                        </p>
                        <p className="ticket-subtitle__elements ticket-subtitle__elements--items">
                            Imp:
                        </p>
                        <p className="ticket-subtitle__elements ticket-subtitle__elements--items">
                            Tot:
                        </p>
                    </div>
                    <ul className="list">
                        {actualTicket &&
                            actualTicket.items?.length &&
                            actualTicket.items.map((el: any) => (
                                <div className="ticket-subtitle__elements">
                                    <li className="ticket-subtitle__elements ticket-subtitle__elements--items">
                                        <FontAwesomeIcon
                                            icon={faMinus}
                                            className="icon"
                                        />
                                        {el.uds}
                                        <FontAwesomeIcon
                                            icon={faPlus}
                                            className="icon"
                                            onClick={() =>
                                                updateTicket(el.article.id)
                                            }
                                        />
                                    </li>
                                    <li className="ticket-subtitle__elements ticket-subtitle__elements--items">
                                        {el.article.item}
                                    </li>
                                    <li className="ticket-subtitle__elements ticket-subtitle__elements--items">
                                        {el.article.price.toFixed(2)}
                                    </li>
                                    <li className="ticket-subtitle__elements ticket-subtitle__elements--items">
                                        {(el.article.price * el.uds).toFixed(2)}
                                    </li>
                                </div>
                            ))}
                    </ul>
                </div>
                <div className="tot">
                    <div>Tot. art</div>
                    <div>Tot. </div>
                </div>
            </div>
            <div className="block2">
                <Products />
            </div>
            <div className="block3">
                <Link className="link" to="/">
                    <div className="block3__list block3__list--sala">Sala</div>
                </Link>
                <Link to="/closeTicket">
                    <div className="block3__list block3__list--close">
                        Cerrar Ticket
                    </div>
                </Link>
                <div className="block3__list block3__list--invite">
                    Invitacíon
                </div>
                <div />
            </div>
        </div>
    );
}

export default TicketPage;
