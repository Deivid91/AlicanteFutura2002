"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Container, Card, Button, Form, Row, Col, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, EnvelopeFill, LockFill, EyeFill, EyeSlashFill } from "react-bootstrap-icons"
import { motion } from "framer-motion"
// En la parte superior, importa el hook useAuth
import { useAuth } from "../contexts/AuthContext"
// Justo después de la importación del useAuth, importamos los íconos para los proveedores sociales
import { Google } from "react-bootstrap-icons"

// Reemplazar la función PaginaLogin por esta versión actualizada
export const PaginaLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [socialAuthLoading, setSocialAuthLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [validated, setValidated] = useState<boolean>(false)
  // Añade esta línea cerca del inicio de la función PaginaLogin
  const { login, loginWithGoogle, error: authError } = useAuth()

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  // Reemplaza la función handleEmailLogin con:
  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setLoading(true)
    setError(null)

    try {
      await login(email, password)
      navigate("/")
    } catch (error) {
      setError("Credenciales inválidas. Por favor, verifica tu email y contraseña.")
    } finally {
      setLoading(false)
    }
  }

  // Agregar estas funciones para manejar la autenticación social
  const handleGoogleLogin = async () => {
    try {
      setSocialAuthLoading(true)
      setError(null)
      await loginWithGoogle()
      navigate("/")
    } catch (error) {
      // El error ya se establece en el contexto de autenticación
    } finally {
      setSocialAuthLoading(false)
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="bg-success text-white p-4 text-center">
                <h2 className="fw-bold mb-0">Iniciar Sesión</h2>
                <p className="mb-0 mt-2 opacity-75">Accede a tu cuenta de Swapify</p>
              </div>

              <Card.Body className="p-4">
                <Button variant="link" className="text-muted p-0 mb-4" onClick={() => navigate(-1)}>
                  <ArrowLeft className="me-1" /> Volver
                </Button>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                <Form noValidate validated={validated} onSubmit={handleEmailLogin}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Correo electrónico</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <EnvelopeFill className="text-muted" />
                      </span>
                      <Form.Control
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa un correo electrónico válido.
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <LockFill className="text-muted" />
                      </span>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <Button variant="light" onClick={() => setShowPassword(!showPassword)} className="border">
                        {showPassword ? <EyeSlashFill /> : <EyeFill />}
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        La contraseña debe tener al menos 6 caracteres.
                      </Form.Control.Feedback>
                    </div>
                    <div className="d-flex justify-content-end mt-2">
                      <Link to="/recuperar-password" className="text-decoration-none text-success small">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="success" type="submit" size="lg" className="rounded-pill" disabled={loading}>
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Iniciando sesión...
                        </>
                      ) : (
                        "Iniciar Sesión"
                      )}
                    </Button>
                  </div>
                </Form>

                <div className="my-4">
                  <div className="text-center mb-3">
                    <span className="text-muted">O inicia sesión con</span>
                  </div>
                  <div className="d-grid gap-2">
                    <Button
                      variant="outline-danger"
                      className="d-flex align-items-center justify-content-center gap-2"
                      onClick={handleGoogleLogin}
                      disabled={socialAuthLoading}
                    >
                      <Google size={20} />
                      <span>Continuar con Google</span>
                    </Button>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <p className="mb-0">
                    ¿No tienes cuenta?{" "}
                    <Link to="/registro" className="text-success fw-bold">
                      Regístrate
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <p className="text-muted small">
                Al iniciar sesión, aceptas nuestros{" "}
                <Link to="/terminos" className="text-decoration-none">
                  Términos y Condiciones
                </Link>{" "}
                y{" "}
                <Link to="/privacidad" className="text-decoration-none">
                  Política de Privacidad
                </Link>
                .
              </p>
            </div>
          </motion.div>
        </Col>
      </Row>
    </Container>
  )
}
