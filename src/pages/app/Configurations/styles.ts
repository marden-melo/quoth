import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Content = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const SettingsContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const SettingsTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 2rem;
`;

export const Section = styled.section`
  margin-bottom: 2rem;
  h2 {
    font-size: 1.25rem;
    font-weight: 500;
    color: #555;
    margin-bottom: 1rem;
  }
`;

export const Item = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SelectInput = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 100%;
  max-width: 250px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const ButtonWrapper = styled.div`
  button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 4px;
    border: none;
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const ButtonLogout = styled.button`
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background-color: #dc3545;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #c82333;
  }
`;
