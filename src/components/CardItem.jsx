import React from 'react'
import { Badge, Card } from "react-bootstrap";
import {
  FiEye,
  FiGift,
} from "react-icons/fi";
import { FaArrowUp } from "react-icons/fa";

export default function CardItem({game}) {
  return (
    <Card className="m-1 shadow">
                <Card.Body className="d-flex px-1 py-1 flex-wrap justify-content-center align-items-center">
                  <div className="col-3  pe-3">
                    <img
                      src={game.logo}
                      alt={game.title}
                      className="w-100 gcard_logo"
                    />
                  </div>
                  <div className="col-9 ">
                    <h6 className="gcard_title mb-0">{game.name}</h6>
                    <p className="mb-0 p-0 fs-13"> Version : {game.version}</p>
                    <p className="mb-0 fs-13">
                      {game.size} ,
                      <span className="fw-bold">
                        {game.type.toLowerCase().includes("online") &&
                        game.type.toLowerCase().includes("offline")
                          ? "Online & Offline"
                          : game.type.toLowerCase().includes("online")
                          ? "Online"
                          : "Offline"}
                      </span>
                    </p>
                    <div className="g_card_badge text-right">
                      
                      {game.new == 1 ? (
                        <Badge
                          bg="danger"
                          className="font-weight-bold card_badge"
                        >
                          <FiGift /> <span> New</span> 
                        </Badge>
                      ) : game.new == 2 ? (
                        <Badge
                          bg="success"
                          className="font-weight-bold card_badge"
                        >
                          <FaArrowUp />
                          Update
                        </Badge>
                      ) : (
                        ""
                      )}
                      <br/>
                      <Badge bg="primary" className="font-weight-bold card_badge">
                        <FiEye /> 
                        <span> {game.count}</span>
                      </Badge>
                    </div>
                  </div>
                </Card.Body>
              </Card>
  )
}
