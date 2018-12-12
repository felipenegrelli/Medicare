import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Row, Col } from "reactstrap";

import { PanelHeader, FormInputs, CardAuthor, CardSocials } from "components";

import userBackground from "assets/img/bg5.jpg";
import userAvatar from "assets/img/mike.jpg";

class NovoUsuario extends React.Component {
  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={12} xs={12}>
              <Card>
                <CardHeader>
                  <h5 className="title">Novo Usuario</h5>
                </CardHeader>
                <CardBody>
                  <form>

                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Nome",
                          inputProps: {
                            type: "text",
                            placeholder: "",
                            defaultValue: ""
                          }
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Email",
                          inputProps: {
                            type: "email",
                            placeholder: "",
                            defaultValue: ""
                          }
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Senha",
                          inputProps: {
                            type: "email",
                            placeholder: "",
                            defaultValue: ""
                          }
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Nome da Mãe",
                          inputProps: {
                            type: "text",
                            placeholder: "",
                            defaultValue: ""
                          }
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Data de Nascimento",
                          inputProps: {
                            type: "date",
                            placeholder: "",
                            defaultValue: ""
                          }
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "RG",
                          inputProps: {
                            type: "number",
                            placeholder: "",
                            defaultValue: ""
                          }
                        },
                        {
                          label: "Documento",
                          inputProps: {
                            type: "number",
                            placeholder: "",
                            defaultValue: ""
                          }
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          label: "Endereço",
                          inputProps: {
                            type: "text",
                            placeholder: "",
                            defaultValue: ""
                          }
                        }
                      ]}
                    />
                  </form>

                  <Button color="danger" className="float-left" href="/usuarios">Cancelar</Button>
                  <Button color="info" className="float-right" href="/usuarios">Salvar</Button>
                  
                </CardBody>
              </Card>
            </Col>
            
          </Row>
        </div>
      </div>
    );
  }
}

export default NovoUsuario;
