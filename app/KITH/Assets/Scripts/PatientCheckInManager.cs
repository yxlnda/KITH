using UnityEngine;
using UnityEngine.UI;

public class PatientCheckInManager : MonoBehaviour
{
    public Button btnStart;
    public Button btnCapture;
    public Button btnReminiscence;

    public enum CheckInState
    {
        Idle,
        CheckingIn,
        Completed
    }

    public CheckInState currentState = CheckInState.Idle;

    void Start()
    {
        UpdateButtons();
    }

    void UpdateButtons()
    {
        btnStart.interactable = (currentState == CheckInState.Idle);
        btnCapture.interactable = (currentState == CheckInState.CheckingIn);
        btnReminiscence.interactable = (currentState == CheckInState.Completed);
    }

    public void OnStartCheckInButton()
    {
        if (currentState == CheckInState.Idle)
        {
            currentState = CheckInState.CheckingIn;
            Debug.Log("Check-in started.");
            UpdateButtons();
        }
    }

    public void OnCaptureMemoryButton()
    {
        if (currentState == CheckInState.CheckingIn)
        {
            Debug.Log("Memory captured (placeholder).");

            // Automatically complete after capture
            currentState = CheckInState.Completed;
            Debug.Log("Check-in completed.");

            UpdateButtons();
        }
    }

    public void OnReminiscenceModeButton()
    {
        if (currentState == CheckInState.Completed)
        {
            Debug.Log("Reminiscence mode activated (placeholder).");
        }
    }
}