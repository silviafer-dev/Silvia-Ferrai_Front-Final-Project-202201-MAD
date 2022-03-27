/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { getAllTickets, getTicket } from '../../redux/ticket/actionCreator';

function KitchenPage() {
    const ticket = useSelector((state: RootState) => state.ticket);
    const user = useSelector((state: RootState) => state.user);
    // const ticketInfo = useSelector((state: RootState) => state.ticket);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTickets());
        dispatch(getTicket(ticket.id, user.token));
    }, [dispatch]);

    return (
        <div>
            <div>COMANDAS</div>
            <div>
                {ticket.length &&
                    ticket.map((item: any, index: number) => (
                        <div key={item._id}>ticket {index + 1}</div>
                    ))}

                <div>
                    {ticket.items &&
                        ticket.items.article?.length &&
                        ticket.items.article.map((el: any) => (
                            <div className="ticket-subtitle__elements">
                                <div className="ticket-subtitle__elements ticket-subtitle__elements--items">
                                    {el.uds}
                                </div>
                                <div className="ticket-subtitle__elements ticket-subtitle__elements--items">
                                    {el.article.item}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default KitchenPage;
