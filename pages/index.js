export default function Home() {
  return (
    <span class="login-container login-area">
      <section>
        <h1>Login do RH</h1>
        <img
          src="/assets/img/logo.png"
          alt="Logo do aplicativo 'do RH'"
          class="logo"
        />

        <form action="">
          <label htmlFor="email">Seu e-mail</label>
          <input type="text" name="email" class="text-fild" autoFocus />

          <label htmlFor="pass">Sua senha</label>
          <input type="password" name="pass" class="text-fild" />

          <button class="btn-action">Acessar painel</button>
        </form>

        {/* <p class="out-text">Mensagem de erro</p>
         */}
      </section>
    </span>
  );
}
