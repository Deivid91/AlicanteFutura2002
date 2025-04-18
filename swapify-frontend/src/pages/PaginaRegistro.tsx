"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Container, Card, Button, Form, Row, Col, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  EnvelopeFill,
  LockFill,
  PersonFill,
  EyeFill,
  EyeSlashFill,
  CheckCircleFill,
  Google,
} from "react-bootstrap-icons"
import { motion } from "framer-motion"
import { UserService } from "../services/userService"
import { useAuth } from "../contexts/AuthContext" // Importar el hook useAuth

// Actualizar la función PaginaRegistro para añadir autenticación social
export const PaginaRegistro = () => {
  const navigate = useNavigate()
  const { login, loginWithGoogle, error: authError } = useAuth() // Usar el hook useAuth
  const userService = new UserService()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [socialAuthLoading, setSocialAuthLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [validated, setValidated] = useState<boolean>(false)
  const [step, setStep] = useState<number>(1)

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)
    setStep(2)
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setValidated(true)
    setLoading(true)
    setError(null)

    try {
      // Ahora pasamos también el nombre al método register
      await userService.register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      })

      // Iniciar sesión automáticamente después del registro
      await login(formData.email, formData.password)

      // Redirigir al usuario a la página principal
      navigate("/")
    } catch (error: any) {
      // Mejorar el manejo de errores para mostrar mensajes más específicos
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else if (error.message) {
        setError(error.message)
      } else {
        setError("Error en el registro. Por favor, inténtalo de nuevo.")
      }
    } finally {
      setLoading(false)
    }
  }

  // Validación de contraseña
  const passwordStrength = (): { strength: string; color: string } => {
    const { password } = formData
    if (!password) return { strength: "Débil", color: "danger" }

    if (password.length < 6) return { strength: "Débil", color: "danger" }
    if (password.length < 8) return { strength: "Media", color: "warning" }
    if (password.length >= 8) return { strength: "Fuerte", color: "success" }

    return { strength: "Media", color: "warning" }
  }

  const { strength, color } = passwordStrength()

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="bg-success text-white p-4 text-center">
                <h2 className="fw-bold mb-0">Crear Cuenta</h2>
                <p className="mb-0 mt-2 opacity-75">Únete a la comunidad de Swapify</p>
              </div>

              <Card.Body className="p-4">
                <Button
                  variant="link"
                  className="text-muted p-0 mb-4"
                  onClick={() => (step === 1 ? navigate(-1) : setStep(1))}
                >
                  <ArrowLeft className="me-1" /> {step === 1 ? "Volver" : "Paso anterior"}
                </Button>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                {step === 1 ? (
                  <Form noValidate validated={validated} onSubmit={handleNextStep}>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Nombre completo</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <PersonFill className="text-muted" />
                        </span>
                        <Form.Control
                          type="text"
                          placeholder="Tu nombre"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">Por favor ingresa tu nombre.</Form.Control.Feedback>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formEmail">
                      <Form.Label>Correo electrónico</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <EnvelopeFill className="text-muted" />
                        </span>
                        <Form.Control
                          type="email"
                          placeholder="ejemplo@correo.com"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Por favor ingresa un correo electrónico válido.
                        </Form.Control.Feedback>
                      </div>
                    </Form.Group>

                    {step === 1 && (
                      <div className="my-4">
                        <div className="text-center mb-3">
                          <span className="text-muted">O regístrate con</span>
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
                    )}

                    <div className="d-grid">
                      <Button variant="success" type="submit" size="lg" className="rounded-pill">
                        Continuar
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <Form noValidate validated={validated} onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Contraseña</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <LockFill className="text-muted" />
                        </span>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Contraseña"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
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
                      <div className="mt-2 d-flex align-items-center">
                        <div className={`progress flex-grow-1 me-2`} style={{ height: "6px" }}>
                          <div
                            className={`progress-bar bg-${color}`}
                            style={{
                              width: `${formData.password.length > 0 ? (formData.password.length > 8 ? 100 : formData.password.length * 12.5) : 0}%`,
                            }}
                          ></div>
                        </div>
                        <span className={`text-${color} small`}>{strength}</span>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formConfirmPassword">
                      <Form.Label>Confirmar contraseña</Form.Label>
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <LockFill className="text-muted" />
                        </span>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirmar contraseña"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        {formData.password && formData.password === formData.confirmPassword && (
                          <span className="input-group-text bg-light text-success">
                            <CheckCircleFill />
                          </span>
                        )}
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
                            Creando cuenta...
                          </>
                        ) : (
                          "Crear Cuenta"
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
                <div className="text-center mt-4">
                  <p className="mb-0">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" className="text-success fw-bold">
                      Inicia Sesión
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <p className="text-muted small">
                Al registrarte, aceptas nuestros{" "}
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
