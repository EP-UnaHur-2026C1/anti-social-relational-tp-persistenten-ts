# Feedback del Trabajo Práctico

## Integrantes

Integrantes identificados a partir de los commits del repositorio:

- **Luca Carlino** (`lucaCarlino04`)
- **Facundo Arias** (`facundoArias217`)
- **Malena Lozano / `maleloza`**
- **Enzo Nahuel Carnero** (`EnzoNahuel23`)

> Se observa trabajo repartido entre los cuatro integrantes. 👏

---

## Resumen General

¡Buen trabajo! 🎉 El proyecto resuelve el núcleo del MVP con una arquitectura en capas muy ordenada (controllers / models / middlewares / routes / schemas) y, sobre todo, con **middlewares genéricos parametrizables** y un **atributo virtual** para la visibilidad de comentarios — dos de las cosas que la cátedra busca específicamente. Además incorporaron **migraciones** y resolvieron el **bonus de seguidores** de punta a punta (modelo, controlador y rutas), lo cual está por encima de lo pedido.

Hay un puñado de ajustes para pulir —el principal destraba la creación de posts y el otro hace configurable la regla de los 6 meses— y un pendiente de documentación (Swagger y colección de prueba). Nada de eso opaca una base que está muy bien encarada.

### Estado por criterio

| Criterio        | Estado | Comentario breve |
|-----------------|:------:|------------------|
| Arquitectura    |   ✅   | Capas claras + middlewares genéricos reutilizables. |
| Modelado        |   ✅   | Relaciones completas, `nickName` único, atributo virtual, followers. |
| Validaciones    |   ⚠️   | Joi con mensajes propios; el schema de post no coincide con el modelo (Obs. 1). |
| Middlewares     |   ✅   | `validarById(modelo)` + `genericSchemaValidator` (patrón valorado). |
| API REST        |   ⚠️   | CRUD completo; la creación de post rechaza un caso válido (Obs. 1). |
| Configuración   |   ⚠️   | Puerto configurable; la regla de meses está fija en el código (Obs. 2). |
| Documentación   |   ❌   | Falta Swagger y colección de prueba (Obs. 3). |

---

## Fortalezas

### 1. Middlewares genéricos parametrizables ♻️
**Ubicación:** `src/middlewares/generic.middleware.js`, `src/schemas/genericSchemaValidator.js`

`validarById(modelo)` devuelve un middleware que valida la existencia de un registro para **cualquier** modelo, y `genericSchemaValidator(schema, data)` centraliza la validación con Joi. Es exactamente el patrón de “middleware genérico parametrizable” que se valora en la materia, y lo componen muy bien en las rutas (`post.middleware.js`, `user.route.js`). 👌

### 2. Regla de comentarios resuelta con un atributo virtual ⏳
**Ubicación:** `src/db/models/comentario.js` (`estaVisible`), `src/controllers/posts.controller.js` (`getComentarios`)

Modelaron `estaVisible` como atributo **VIRTUAL** (no se persiste, se calcula a partir de `fechaPublicacion`) y lo aplican al mostrar los comentarios de un post:

```js
const visibles = post.Comentarios.filter(c => c.estaVisible);
```

Incluso dejaron comentado *por qué* se filtra en memoria y no con un `where` (porque el atributo es virtual). Se nota comprensión del tema. 👏

### 3. Modelado completo y prolijo 🗃️
**Ubicación:** `src/db/models/`

- `nickName` definido como **único** (`unique: true`).
- Renombraron `createdAt` a `fechaPublicacion`, alineando el modelo con el lenguaje del dominio.
- Están todas las relaciones: 1:N (User→Post, User→Comentario, Post→Comentario, Post→Post_Image) y N:M (Post↔Tag).
- Sumaron la relación reflexiva de **seguidores** (`seguidores` / `siguiendo` a través de `User_Seguidor`).

### 4. Bonus de seguidores implementado de punta a punta 🔗
**Ubicación:** `src/controllers/users.controller.js`, `src/routes/user.route.js`

No se quedaron solo en el modelo: hay endpoints para seguir (`POST /users/:id/seguidores/:otroId`) y dejar de seguir, con middlewares que evitan que un usuario se siga a sí mismo (`validarSeguirseSolo`). Muy bien resuelto para ser un bonus.

### 5. Validaciones con integridad referencial 🛡️
**Ubicación:** `src/middlewares/post.middleware.js`

`verificarUsuarioExistente` chequea que el `userId` exista antes de crear un post/comentario, y los schemas de Joi traen **mensajes personalizados** claros. Buena práctica de validación.

---

## Observaciones

### 1. El schema de creación de post no coincide con el modelo ni con el enunciado

**Estado:** ⚠️  **Severidad:** 🟠 Importante
**Ubicación:** `src/schemas/post.schema.js` (vs `src/controllers/posts.controller.js` y `src/db/models/post.js`)

**Descripción:**
El `postSchema` exige dos cosas que generan fricción al crear un post:

```js
fechaPublicacion: joi.date().iso().required(),     // (1)
imagenes: joi.array().items(...).min(1).required() // (2)
```

1. `fechaPublicacion` se pide **obligatoria en el body**, pero el modelo la genera automáticamente (es el `createdAt` renombrado) y el controller ni la usa: `Post.create({ descripcion, userId })`. El cliente se ve obligado a mandar un dato que después se ignora.
2. `imagenes` está como **requerida con al menos 1**, pero el enunciado dice que las imágenes son **opcionales** (“cero o más imágenes”). Con este schema, **no se puede crear un post solo con descripción**, que es justamente el caso principal.

**Impacto:**
Un `POST /posts` con descripción y `userId` válidos —pero sin `fechaPublicacion` o sin imágenes— es rechazado con 400, aunque debería ser válido. Afecta el endpoint central de la aplicación.

**Recomendación:**
Quitar `fechaPublicacion` del schema (la maneja Sequelize) y hacer `imagenes` opcional:

```js
const postSchema = joi.object({
  descripcion: joi.string().max(1000).required().messages({ /* ... */ }),
  userId: joi.number().integer().required(),
  tags: joi.array().items(joi.number().integer()),
  imagenes: joi.array().items(joi.object({ url: joi.string().uri().required() })) // sin .min(1).required()
});
```

---

### 2. La antigüedad de los comentarios (X meses) está fija en el código

**Estado:** ⚠️  **Severidad:** 🟠 Importante
**Ubicación:** `src/db/models/comentario.js` (getter de `estaVisible`)

**Descripción:**
El cálculo usa un valor fijo de ~6 meses expresado en milisegundos:

```js
return this.fechaPublicacion > new Date(Date.now() - 182.5 * 24 * 60 * 60 * 1000);
```

El enunciado pide que ese umbral sea **configurable mediante variables de entorno**. La parte difícil (el atributo virtual y el filtrado) ya está resuelta; solo falta leer el valor del entorno.

**Impacto:**
Hoy cambiar la ventana de visibilidad obliga a tocar el código. Además, 182.5 días es una aproximación de “6 meses” que puede desfasarse unos días según el mes.

**Recomendación:**
Leer la cantidad de meses desde el entorno y calcular la fecha límite con aritmética de meses:

```js
const MESES = Number(process.env.MESES ?? 6);
get() {
  const limite = new Date();
  limite.setMonth(limite.getMonth() - MESES);
  return this.fechaPublicacion > limite;
}
```

---

### 3. Falta la documentación de la API y la colección de prueba

**Estado:** ❌  **Severidad:** 🟠 Importante
**Ubicación:** raíz del proyecto / `README.md`

**Descripción:**
El enunciado pide **Swagger en formato YAML** documentando los endpoints y una **colección de prueba** (Postman o JSON de ejemplo). En la entrega no encontramos ninguno de los dos, y el `README.md` es por ahora una copia del enunciado, sin instrucciones de instalación/ejecución.

**Impacto:**
Sin documentación ni colección, quien quiera probar la API tiene que deducir las rutas y los formatos leyendo el código. Son entregables explícitos del trabajo.

**Recomendación:**
Agregar un `swagger.yaml` (pueden servirlo con `swagger-ui-express`, como hicieron otras herramientas que ya conocen) y exportar una colección de Postman con ejemplos de cada endpoint. En el README alcanza con sumar: requisitos, `npm install`, cómo levantar (`npm run dev`) y la URL base.

---

### Detalles menores (para una próxima pasada)

- En `updatePost`, `deletePost`, `updateTag`, etc., se hace `findByPk` y luego `.update()/.destroy()` sin chequear si el registro existe; si no existe, hoy responde **500** en lugar de **404**. Ya tienen `validarById`: aplicarlo en esas rutas resolvería el caso de forma uniforme.
- Las etiquetas se asocian solo al **crear** el post (`addTags`). Sería un lindo complemento agregar endpoints para **asociar/quitar tags a un post existente**, como ya hicieron con las imágenes.

---

## Conclusión

Es una entrega con una base muy buena: arquitectura clara, los patrones que la materia valora (middlewares genéricos y atributo virtual) bien aplicados, modelado completo y hasta un bonus resuelto. 🌟

Los ajustes principales son acotados y concretos: corregir el schema de creación de post (para no exigir imágenes ni fecha), llevar la ventana de meses a una variable de entorno, y sumar la documentación (Swagger + colección). Con esos cambios el trabajo queda redondo. ¡Van muy bien, sigan así! 🚀
