using UnityEngine;
using TMPro; // Use this for TextMeshPro input fields
using UnityEngine.UI;

public class CaretakerRegistration : MonoBehaviour
{
    [Header("UI References")]
    public TMP_InputField fullNameInput;
    public TMP_InputField emailInput;
    public TMP_InputField passwordInput;
    public Button signUpButton;

    public void HandleSignUp()
    {
        string name = fullNameInput.text;
        string email = emailInput.text;

        if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(email))
        {
            Debug.Log("Please fill in all fields.");
            return;
        }

        // Logic to save user to database (Firebase/PlayFab) goes here
        Debug.Log($"Registering Caretaker: {name}");
        
        // Move to Caretaker Homepage after success
        FindFirstObjectByType<SceneLoader>().LoadCaretakerHome();
    }
}
