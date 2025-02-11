export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-4 rounded shadow-md w-1/3">
        <h1 className="text-2xl text-center mb-4 font-semibold">Cadastro de Usuários</h1>
        <div className="mb-2">
          <label
            htmlFor="name"
            className="block font-medium text-sm text-gray-700"
          >
            Nome:
          </label>
          <input
            id="name"
            type="text"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 required"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block font-medium text-sm text-gray-700"
          >
            E-mail:
          </label>
          <input
            type="email"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 required"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="idade"
            className="block font-medium text-sm text-gray-700"
          >
            Idade:
          </label>
          <input
            type="number"
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 required"
          />
        </div>
        <div className="mb-2 text-center">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 active:bg-blue-700 transition-all" >
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}