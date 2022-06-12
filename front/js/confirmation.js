const orderId = new URL(location.href).searchParams.get("orderId");

document.querySelector("#orderId").innerText = orderId;