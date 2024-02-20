import React from 'react'


const usePasswordToggle = () => {
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
  return (
    <div>

      <i class="bi bi-eye"></i>
      <i class="bi bi-eye-slash"></i>
     
    </div>
  )
}

export default usePasswordToggle
